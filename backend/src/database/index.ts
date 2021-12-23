import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import User from './entity/user.entity';
import VerificationToken from './entity/verificationToken.entity';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dbadmin',
  password: 'dbadmin#123',
  database: 'dbex',
  entities: [User, VerificationToken],
  synchronize: true,
};
const typeOrmModule = TypeOrmModule.forRoot(dbConfig);
export default typeOrmModule;
