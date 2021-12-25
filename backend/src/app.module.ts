import { Module } from '@nestjs/common';
import { SendgridModule } from './mailer/sendgrid.module';
import TypeOrmModule from './database';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { InvoicesModule } from './invoices/invoices.module';
import { ClientsModule } from './clients/clients.module';
import { AuthModule } from './auth/auth.module';

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
  ],
})
export class AppModule {}
