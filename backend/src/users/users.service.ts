import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository, QueryRunner } from 'typeorm';
import ValidationErrors from 'src/errors/ValidationErrors';
import { QueryBuilderService } from 'src/utils/queryBuilder.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUtils } from 'src/auth/auth.utils';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly qbs: QueryBuilderService,
    private readonly authUtils: AuthUtils,
  ) {}
  async create(
    { username, password, email }: CreateUserInput,
    queryRunner?: QueryRunner,
  ): Promise<User> {
    const existingUser = await this.userRepo.findOne({ username });
    if (existingUser) {
      throw new BadRequestException(
        `Username ${existingUser.username} already exists!`,
      );
    }
    const existingEmail = await this.userRepo.findOne({ email });
    if (existingEmail) {
      throw new BadRequestException(
        `Email ${existingEmail.email} already exists!`,
      );
    }
    const hashedPassword = await this.authUtils.hashPassword(password);

    const user = this.userRepo.create({ email, password, username });
    const errors = await validate(user);
    user.password = hashedPassword;
    if (errors.length) {
      throw new ValidationErrors(errors);
    }
    if (queryRunner) {
      return queryRunner.manager.save(user);
    }
    return this.userRepo.save(user);
  }

  async findAll(params) {
    const query = this.qbs.buildQuery(params, 'User');
    const res = await this.userRepo.findAndCount(query);
    const data = res[0];
    const count = res[1];
    return { data, count };
  }

  async findOne(query): Promise<User | undefined> {
    return this.userRepo.findOne(query);
  }

  async update(
    query: { email?: string; id?: string },
    updateUserInput: Partial<UpdateUserInput>,
    queryRunner?: QueryRunner,
  ) {
    const user = new UpdateUserInput(updateUserInput);
    const errors = await validate(user);
    if (errors.length) {
      throw new ValidationErrors(errors);
    }
    const { id: _extractedId, ...userValues } = user;
    if (queryRunner) {
      await queryRunner.manager.update('user', query, userValues);
    } else {
      await this.userRepo.update(query, userValues);
    }
    return this.findOne(query);
  }
  async updatePassword(
    id,
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
  ) {
    const user = await this.findOne(id);
    if (
      user &&
      !(await this.authUtils.comparePasswords({
        password: oldPassword,
        hashedPassword: user.password,
      }))
    ) {
      throw new UnauthorizedException('Invalid password');
    }
    user.password = await this.authUtils.hashPassword(newPassword);
    this.userRepo.update({ id }, user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
