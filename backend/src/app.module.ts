import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SendgridModule } from './mailer/sendgrid.module';
import TypeOrmModule from './database';

@Module({
  imports: [TypeOrmModule, SendgridModule, AuthModule, UsersModule],
})
export class AppModule {}
