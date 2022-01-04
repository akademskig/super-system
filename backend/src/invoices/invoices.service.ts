import { Injectable } from '@nestjs/common';
import { getConnectionName, InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { Invoice } from './entities/invoice.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Client } from 'src/clients/entities/client.entity';
import { UpdateCompanyInput } from 'src/companies/dto/update-company.input';
import { InvoiceItem } from './entities/invoice-item.entity';
import { CalculatePriceInput } from './dto/price.input';
import getNextInvoiceNumber from './utils/getNextInvoiceNumber';
import { PDFService } from 'src/lib/nestjs-pdf';
import { firstValueFrom } from 'rxjs';
import { AWSS3Service } from 'src/aws/aws-s3.service';
import { InvoiceItemInput } from './dto/invoice-item.input';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
    private readonly pdfService: PDFService,
  ) {}
  async create(
    createInvoiceInput: CreateInvoiceInput & {
      user: User;
    },
  ) {
    const {
      company: companyId,
      client: clientId,
      ...rest
    } = createInvoiceInput;
    const company = await this.companyRepo.findOne(companyId);
    const client = await this.clientRepo.findOne(clientId);
    const invoiceData = {
      ...rest,
      client,
      company,
    };
    const invoice = await this.invoiceRepo.create(invoiceData);
    return this.invoiceRepo.save(invoice);
  }

  async findAll(userId) {
    return this.invoiceRepo.find({
      where: { user: userId },
      relations: ['client', 'company'],
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} invoice`;
  }

  async update(updateInvoiceInput: Partial<UpdateInvoiceInput>) {
    const {
      id,
      company: companyId,
      client: clientId,
      ...rest
    } = updateInvoiceInput;
    const company = await this.companyRepo.findOne(companyId);
    const client = await this.clientRepo.findOne(clientId);
    await this.invoiceRepo.update(id, { ...rest, client, company });
    return this.invoiceRepo.findOne({
      where: { id },
      relations: ['client', 'company'],
    });
  }

  async remove(id: string) {
    await this.invoiceRepo.delete(id);
    return { id };
  }

  calculatePrice(invoice: CalculatePriceInput) {
    const defaultPrice = { net: 0, gross: 0, tax: 0 };
    const { items } = invoice;
    const price = items?.reduce((acc, curr) => {
      const grossPrice = curr.price * curr.amount;
      const netPrice = grossPrice / (1 + curr.tax / 100);
      return {
        net: acc.net + netPrice,
        gross: acc.gross + grossPrice,
        tax: acc.tax + grossPrice - netPrice,
      };
    }, defaultPrice);
    console.log(price);
    if (price) {
      return price;
    }
    return defaultPrice;
  }
  calculateItemsTotal(item: InvoiceItemInput) {
    const defaultPrice = { net: 0, gross: 0, tax: 0 };
    const grossPrice = item.price * item.amount;
    const netPrice = grossPrice / (1 + item.tax / 100);
    const price = {
      net: netPrice,
      gross: grossPrice,
      tax: grossPrice - netPrice,
    };
    if (price) {
      return price;
    }
    return defaultPrice;
  }

  async getNextInvoiceNumber(companyId: string) {
    const res = await this.invoiceRepo.find({
      where: { company: companyId },
      order: {
        updatedAt: 'DESC',
      },
      select: ['invoiceNumber'],
      take: 1,
    });
    return getNextInvoiceNumber(res?.[0]?.invoiceNumber);
  }

  async generatePDF(invoiceId) {
    const invoice = await this.invoiceRepo.findOne(invoiceId);
    const o = await this.pdfService.toFile('invoice.pug', 'invoice-test.pdf', {
      locals: { invoice },
    });
    const r = await firstValueFrom(o);
    if (r) {
      return r.filename;
    }
  }
  async generatePDFBuffer(invoiceId: string, locale: string) {
    const invoice = await this.invoiceRepo.findOne({
      where: { id: invoiceId },
      relations: ['client', 'company'],
    });
    const o = await this.pdfService.toBuffer('invoice.pug', {
      locals: {
        invoice,
        locale,
        utils: {
          formatCurrency: (number, currency) =>
            new Intl.NumberFormat(locale, {
              style: 'currency',
              currency,
            }).format(number),
        },
      },
      format: 'A4',
    });
    const r = await firstValueFrom(o);
    if (r) {
      return r.toString('base64');
    }
  }
}
