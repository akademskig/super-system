import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}
  create(createCompanyInput: CreateCompanyInput & { user: User }) {
    const company = this.companyRepo.create(createCompanyInput);
    return this.companyRepo.save(company);
  }

  findAll(userId) {
    return this.companyRepo.find({ user: userId });
  }

  findOne(id: number) {
    return this.companyRepo.findOne(id);
  }

  async update(id: string, updateCompanyInput: Partial<UpdateCompanyInput>) {
    await this.companyRepo.update(id, updateCompanyInput);
    return this.companyRepo.findOne(id);
  }

  async remove(id: string) {
    await this.companyRepo.delete(id);
    return { id };
  }
}
