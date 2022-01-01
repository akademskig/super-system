import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { Client } from 'src/clients/entities/client.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}
  create(createCompanyInput: CreateCompanyInput & { user: User }) {
    const company = this.companyRepo.create(createCompanyInput);
    return this.companyRepo.save(company);
  }

  findAll(userId) {
    return this.companyRepo.find({
      where: { user: userId },
      relations: ['clients'],
    });
  }

  findOne(id: string) {
    return this.companyRepo.findOne(id);
  }

  async update(updateCompanyInput: Partial<UpdateCompanyInput>) {
    const { id, clientIds, ...rest } = updateCompanyInput;
    if (clientIds.length) {
      const dbClients = await this.clientRepo
        .createQueryBuilder('client')
        .where(`id IN (:...clientIds)`)
        .setParameter('clientIds', clientIds)
        .getMany();
      const company = await this.companyRepo.findOne(id);
      company.clients = dbClients;
      await this.companyRepo.save(company);
    }
    await this.companyRepo.update(id, rest);
    return this.companyRepo.findOne(id, { relations: ['clients'] });
  }

  async remove(id: string) {
    await this.companyRepo.delete(id);
    return { id };
  }
}
