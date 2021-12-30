import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { Client } from 'src/clients/entities/client.entity';
import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { InvoiceItem } from './invoice-item.entity';
import { Price } from './price.entity';

export enum InvoiceTypes {
  R = 'R',
  R1 = 'R1',
  R2 = 'R2',
  ADVANCE = 'advance',
  NONE = 'none',
}
const defaultInvoiceItem = {
  desciption: '',
  unit: '',
  price: 0,
  discount: 0,
  tax: 0,
  amount: 0,
};
registerEnumType(InvoiceTypes, {
  name: 'InvoiceTypes',
});

@Entity()
@ObjectType()
export class Invoice {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field(() => String)
  @Column({ length: 500 })
  serviceType: string;

  @Field(() => String)
  @Length(8)
  @Column('text')
  invoiceNumber: string;

  @Field(() => String)
  @Length(20)
  @Column('text')
  paymentMethod: string;

  @Column({ type: 'enum', enum: InvoiceTypes, default: InvoiceTypes.R })
  @Field(() => InvoiceTypes)
  invoiceType: InvoiceTypes;

  @ManyToOne(() => Client, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => Client)
  client: Client;

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => Company)
  company: Company;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => User)
  user: User;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text' })
  notes: string;

  @Field(() => [InvoiceItem], { nullable: true })
  @Column({ type: 'json', default: [defaultInvoiceItem] })
  items: InvoiceItem[];

  @Field(() => Price, { nullable: true })
  @Column({ type: 'json', default: { net: 0, gross: 0 } })
  price: Price;

  @Field(() => String, { nullable: true })
  @Length(3)
  @Column('text', { nullable: true })
  currency: string;

  @Field(() => Date)
  @Column({ type: Date })
  date: Timestamp;

  @Field(() => Date)
  @Column({ type: Date })
  paymentDeadline: Timestamp;

  @Field(() => Date)
  @Column({ type: Date })
  shipmentDate: Timestamp;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Timestamp;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Timestamp;
}
