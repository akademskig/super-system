import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { SendgridModule } from '../mailer/sendgrid.module';
import { PassportModule } from '@nestjs/passport';
import MailService from '../../dist/mailer/mail.service';
import { QueryBuilderService } from '../utils/queryBuilder.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import VerificationToken from '../database/entity/verificationToken.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthUtils } from './auth.utils';
import { AuthService } from './auth.service';
import { CustomStrategy } from './custom.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SendgridModule, PassportModule, JwtModule],
      providers: [
        UsersService,
        QueryBuilderService,
        AuthUtils,
        MailService,
        AuthService,
        CustomStrategy,
        JwtStrategy,
        {
          provide: getRepositoryToken(User),
          useValue: 'UserRepository',
        },
        {
          provide: getRepositoryToken(VerificationToken),
          useValue: 'VerificationTokenRepository',
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
