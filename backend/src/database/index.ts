import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import User from './entity/user.entity';
import VerificationToken from './entity/verificationToken.entity';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dbadmin',
  password: 'dbadmin#123',
  database: 'dbex',
  entities: [User, VerificationToken, Invoice, Client],
  synchronize: true,
};
const typeOrmModule = TypeOrmModule.forRoot(dbConfig);
export default typeOrmModule;
