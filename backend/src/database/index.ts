import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { User } from 'src/users/entities/user.entity';
import VerificationToken from './entity/verificationToken.entity';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dbadmin',
  password: 'dbadmin#123',
  database: 'dbex',
  entities: [User, VerificationToken, Client, Company, Invoice],
  synchronize: true,
};
const typeOrmModule = TypeOrmModule.forRoot(dbConfig);
export default typeOrmModule;
