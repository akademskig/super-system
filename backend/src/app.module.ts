import { Module } from '@nestjs/common';
import { SendgridModule } from './mailer/sendgrid.module';
import TypeOrmModule from './database';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { InvoicesModule } from './invoices/invoices.module';
import { ClientsModule } from './clients/clients.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { CurrenciesModule } from './currencies/currencies.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    AuthModule,
    InvoicesModule,
    TypeOrmModule,
    SendgridModule,
    ClientsModule,
    CompaniesModule,
    CurrenciesModule,
  ],
})
export class AppModule {}
