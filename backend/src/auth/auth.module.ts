import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { AuthUtils } from './auth.utils';
import { CustomStrategy } from './custom.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import JwtModule from './jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import VerificationToken from 'src/database/entity/verificationToken.entity';
import { SendgridModule } from 'src/mailer/sendgrid.module';
import MailService from 'src/mailer/mail.service';

@Module({
  imports: [
    SendgridModule,
    UsersModule,
    PassportModule,
    JwtModule,
    TypeOrmModule.forFeature([VerificationToken]),
  ],
  providers: [
    AuthResolver,
    AuthUtils,
    MailService,
    AuthService,
    CustomStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
