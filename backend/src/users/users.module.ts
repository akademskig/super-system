import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthUtils } from 'src/auth/auth.utils';
import { QueryBuilderService } from 'src/utils/queryBuilder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import VerificationToken from 'src/database/entity/verificationToken.entity';
import jwtModule from 'src/auth/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, VerificationToken]), jwtModule],
  providers: [UsersResolver, UsersService, AuthUtils, QueryBuilderService],
  exports: [UsersService],
})
export class UsersModule {}
