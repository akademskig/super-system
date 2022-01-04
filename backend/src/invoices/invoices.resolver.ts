import { Resolver, Query, Mutation, Args, PartialType } from '@nestjs/graphql';
import { InvoicesService } from './invoices.service';
import { Invoice } from './entities/invoice.entity';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UploadedFile, UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from 'src/guards/GQLAuthGuard';
import { GetUser } from 'src/decorators/getUser';
import { User } from 'src/users/entities/user.entity';
import { CalculatePriceInput } from './dto/price.input';
import { Price } from './entities/price.entity';
import { InvoiceItemInput } from './dto/invoice-item.input';
import { Locale } from 'src/decorators/locale';

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
  @Query(() => Price, { name: 'total' })
  calculateItemTotal(
    @Args('invoiceItem', { type: () => InvoiceItemInput })
    invoiceItem: InvoiceItemInput,
  ) {
    return this.invoicesService.calculateItemsTotal(invoiceItem);
  }
  @Query(() => String, { name: 'invoiceNumber' })
  getNextInvoiceNumber(
    @Args('companyId', { type: () => String })
    companyId: string,
  ) {
    return this.invoicesService.getNextInvoiceNumber(companyId);
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

  @Mutation(() => String)
  getPdf(@Locale() locale, @Args('id', { type: () => String }) id: string) {
    return this.invoicesService.generatePDFBuffer(id, locale);
  }
}
