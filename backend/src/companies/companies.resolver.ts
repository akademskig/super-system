import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { GetUser } from 'src/decorators/getUser';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from 'src/guards/GQLAuthGuard';

@Resolver(() => Company)
@UseGuards(GQLAuthGuard)
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Mutation(() => Company)
  createCompany(
    @GetUser() user: User,
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  ) {
    return this.companiesService.create({ ...createCompanyInput, user });
  }

  @Query(() => [Company], { name: 'companies' })
  findAll(@GetUser() user: User) {
    return this.companiesService.findAll(user.id);
  }

  @Query(() => Company, { name: 'company' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.companiesService.findOne(id);
  }

  @Mutation(() => Company)
  updateCompany(
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
  ) {
    return this.companiesService.update(
      updateCompanyInput.id,
      updateCompanyInput,
    );
  }

  @Mutation(() => Company)
  removeCompany(@Args('id', { type: () => String }) id: string) {
    return this.companiesService.remove(id);
  }
}
