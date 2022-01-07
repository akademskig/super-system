import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { Invoice } from './entities/invoice.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Client } from 'src/clients/entities/client.entity';
import { CalculatePriceInput } from './dto/price.input';
import getNextInvoiceNumber from './utils/getNextInvoiceNumber';
import { PDFService } from 'src/lib/nestjs-pdf';
import { firstValueFrom } from 'rxjs';
import { InvoiceItemInput } from './dto/invoice-item.input';
import { HttpService } from '@nestjs/axios';

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
    private readonly httpService: HttpService,
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
      relations: ['client', 'company', 'user'],
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
          splitString: (string, value) => string.split(value),
        },
      },
      format: 'A4',
      type: 'pdf',
      // header: {
      //   height: '10px',
      //   contents: `<div style='text-align: right; margin-top: 25px; margin-right: 25px; color: #696969"; font-family: Roboto; '>
      //   ${invoice.invoiceType} invoice ${invoice.invoiceNumber}</div>`,
      // },
      footer: {
        height: '85px',
        contents: `<footer style="width: 100%; margin-left: 25px; margin-bottom: 25px; ">
        <table  width="100%" style="font-size: 10px;  font-family: Roboto; width="100%; vertical-align: top;">
          <tr>
            <td width="33%" style="vertical-align: top;color: #696969">
              <div style="font-weight: 700; margin-bottom: 2px;">Address</div>
              <div>${invoice.company.street}, 
              ${invoice.company.zipCode} ${invoice.company.city}</div>
              <div>${invoice.company.country}</div>
              </td>
            <td width="33%" style="vertical-align: top;color: #696969">
              <div style="font-weight: 700; margin-bottom: 2px;">Legal infomation</div>
              <div>VAT ID: ${invoice.company.vatId}</div>
              <div>IBAN: ${invoice.company.iban}</div>
              </td>
            <td width="33%" style="vertical-align: top;color: #696969">
              <div style="font-weight: 700; margin-bottom: 2px;">Contacts</div>
              <div>Phone: ${invoice.company.phoneNumber}</div>
              <div>Email: ${invoice.company.email}</div>
              </td>
          </tr>
          </table>
            `,
      },
    });

    const r = await firstValueFrom(o);
    if (r) {
      return r.toString('base64');
    }
  }
}
