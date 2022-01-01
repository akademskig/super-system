import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from 'src/guards/GQLAuthGuard';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/decorators/getUser';
import { GetClientsInput } from './dto/get-client.input';

@Resolver(() => Client)
@UseGuards(GQLAuthGuard)
export class ClientsResolver {
  constructor(private readonly clientsService: ClientsService) {}

  @Mutation(() => Client)
  createClient(
    @GetUser() user: User,
    @Args('createClientInput') createClientInput: CreateClientInput,
  ) {
    return this.clientsService.create({ ...createClientInput, user });
  }

  @Query(() => [Client], { name: 'clients' })
  findAll(
    @GetUser() user: User,
    @Args('query', { type: () => GetClientsInput, nullable: true })
    query?: GetClientsInput,
  ) {
    return this.clientsService.findAll(query, user.id);
  }

  @Query(() => Client, { name: 'client' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.clientsService.findOne(id);
  }

  @Mutation(() => Client)
  updateClient(
    @Args('updateClientInput') updateClientInput: UpdateClientInput,
  ) {
    return this.clientsService.update(updateClientInput.id, updateClientInput);
  }

  @Mutation(() => Client)
  removeClient(@Args('id', { type: () => String }) id: string) {
    return this.clientsService.remove(id);
  }
}
