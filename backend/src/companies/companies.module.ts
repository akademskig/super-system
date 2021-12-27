import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';
import { Company } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompaniesResolver, CompaniesService],
})
export class CompaniesModule {}
