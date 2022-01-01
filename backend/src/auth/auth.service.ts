import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUtils } from './auth.utils';
import MailService from '../mailer/mail.service';
import { getConnection, createQueryBuilder } from 'typeorm';
import { RegisterInput } from './dto/register.input';
import { SignInInput } from './dto/signIn.input';
import { pick } from 'lodash';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly authUtils: AuthUtils,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (
      user &&
      (await this.authUtils.comparePasswords({
        password,
        hashedPassword: user.password,
      }))
    ) {
      const { password: _pwd, ...result } = user;
      return result;
    } else if (
      user &&
      !(await this.authUtils.comparePasswords({
        password,
        hashedPassword: user.password,
      }))
    ) {
      throw new NotFoundException('Invalid username or password');
    } else if (!user) {
      throw new NotFoundException("User doesn't exist!");
    }
  }

  async signIn(user: SignInInput) {
    const dbUser = await this.validateUser(user.email, user.password);
    const payload = pick(dbUser, ['username', 'id', 'role', 'email']);
    return {
      user: {
        ...payload,
      },
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterInput) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const userCreated = await this.usersService.create(user, queryRunner);
      if (userCreated) {
        const verificationToken = await this.authUtils.createVerificationToken(
          userCreated.id,
          queryRunner,
        );
        const { password, ...userData } = userCreated;
        await this.mailService.sendMail(
          userData.email,
          verificationToken.token,
        );
        await queryRunner.commitTransaction();
        return userData;
      }
    } catch (err) {
      Logger.error(
        'Registration error',
        JSON.stringify(err),
        'AuthService.register',
      );
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async verifyUser({ email, token }: { email: string; token: string }) {
    try {
      const qB: any = await createQueryBuilder('verification_token', 'vT');
      const vT = await qB
        .leftJoinAndSelect('vT.user', 'user')
        .where('user.email = :email', { email })
        .getOne();

      if (!vT) {
        return 'User not found';
      } else if (vT.createdAt + vT.duration < Date.now()) {
        return 'Verification token expired.';
      }
      if (vT.token === token) {
        const qR = getConnection().createQueryRunner();
        await qR.startTransaction();
        try {
          await this.usersService.update({ email }, { isVerified: true }, qR);
          await qR.manager.delete('verification_token', { token });
          await qR.commitTransaction();
        } catch (err) {
          await qR.rollbackTransaction();
          throw err;
        } finally {
          await qR.release();
        }
      }
      return `Email ${email} successfully verified!`;
    } catch (err) {
      Logger.error(
        'Email verification error',
        JSON.stringify(err),
        'UsersService.verifyUser',
      );
      throw err;
    }
  }
}
