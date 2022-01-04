import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';
import { Company } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { AWSS3Module } from 'src/aws/aws-s3.module';
console.log(AWSS3Module);
@Module({
  imports: [
    TypeOrmModule.forFeature([Company, Client]),
    AWSS3Module.register(),
  ],
  providers: [CompaniesResolver, CompaniesService],
})
export class CompaniesModule {}
