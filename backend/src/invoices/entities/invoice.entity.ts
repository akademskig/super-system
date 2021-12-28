import {
  ObjectType,
  Field,
  registerEnumType,
  InputType,
  Int,
} from '@nestjs/graphql';
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

export enum InvoiceTypes {
  R = 'R',
}

registerEnumType(InvoiceTypes, {
  name: 'InvoiceTypes',
});

@ObjectType()
export class InvoiceItem {
  @Field(() => String)
  description: string;
  @Field(() => String)
  unit: string;
  @Field(() => String)
  price: string;
  @Field(() => String)
  discount: string;
  @Field(() => String)
  tax: string;
  @Field(() => Int)
  amount: number;
}
@InputType()
export class InvoiceItemInput {
  @Field(() => String)
  description: string;
  @Field(() => String)
  unit: string;
  @Field(() => String)
  price: string;
  @Field(() => String)
  discount: string;
  @Field(() => String)
  tax: string;
  @Field(() => Int)
  amount: number;
}

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
  @Column({ type: 'json', default: [] })
  items: InvoiceItem[];

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