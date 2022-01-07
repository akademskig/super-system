import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesResolver } from './invoices.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Client } from 'src/clients/entities/client.entity';
import { AWSS3Module } from 'src/aws/aws-s3.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice, Company, Client]),
    AWSS3Module,
    HttpModule,
  ],
  providers: [InvoicesResolver, InvoicesService],
})
export class InvoicesModule {}
