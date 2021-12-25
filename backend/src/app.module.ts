import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SendgridModule } from './mailer/sendgrid.module';
import TypeOrmModule from './database';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { InvoicesModule } from './invoices/invoices.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    InvoicesModule,
    TypeOrmModule,
    SendgridModule,
    AuthModule,
    UsersModule,
    ClientsModule,
  ],
})
export class AppModule {}
