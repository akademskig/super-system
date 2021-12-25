import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { Client } from 'src/clients/entities/client.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum InvoiceTypes {
  R = 'R',
}

registerEnumType(InvoiceTypes, {
  name: 'InvoiceTypes',
});

@Entity()
@ObjectType()
export class Invoice {
  @Field(() => String, { description: '' })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field(() => String, { description: '' })
  @Column({ length: 500 })
  serviceType: string;

  @Field(() => String, { description: '' })
  @Length(8)
  @Column('text')
  invoiceNumber: string;

  @Column({ type: 'enum', enum: InvoiceTypes, default: InvoiceTypes.R })
  @Field(() => InvoiceTypes, { description: '' })
  invoiceType: InvoiceTypes;

  @OneToOne((type) => Client, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => Client, { description: '' })
  client: InvoiceTypes;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
