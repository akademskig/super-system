import { Resolver, Query, Mutation, Args, PartialType } from '@nestjs/graphql';
import { InvoicesService } from './invoices.service';
import { Invoice } from './entities/invoice.entity';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from 'src/guards/GQLAuthGuard';
import { GetUser } from 'src/decorators/getUser';
import { User } from 'src/users/entities/user.entity';
import { CalculatePriceInput } from './dto/price.input';
import { Price } from './entities/price.entity';

@Resolver(() => Invoice)
@UseGuards(GQLAuthGuard)
export class InvoicesResolver {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Mutation(() => Invoice)
  createInvoice(
    @GetUser() user: User,
    @Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput,
  ) {
    return this.invoicesService.create({ ...createInvoiceInput, user });
  }

  @Query(() => [Invoice], { name: 'invoices' })
  findAll(@GetUser() user: User) {
    return this.invoicesService.findAll(user);
  }

  @Query(() => Invoice, { name: 'invoice' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.invoicesService.findOne(id);
  }
  @Query(() => Price, { name: 'price' })
  calculatePrice(
    @Args('invoice', { type: () => CalculatePriceInput })
    invoice: CalculatePriceInput,
  ) {
    return this.invoicesService.calculatePrice(invoice);
  }

  @Mutation(() => Invoice)
  updateInvoice(
    @Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput,
  ) {
    return this.invoicesService.update(updateInvoiceInput);
  }

  @Mutation(() => Invoice)
  removeInvoice(@Args('id', { type: () => String }) id: string) {
    return this.invoicesService.remove(id);
  }
}
