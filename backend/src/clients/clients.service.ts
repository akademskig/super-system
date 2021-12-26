import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private readonly clientRepo: Repository<Client>,
  ) {}
  async create(createClientInput: CreateClientInput & { user: User }) {
    const client = this.clientRepo.create(createClientInput);
    return this.clientRepo.save(client);
  }

  findAll(userId) {
    return this.clientRepo.find({ user: userId });
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientInput: UpdateClientInput) {
    return `This action updates a #${id} client`;
  }

  async remove(id: string) {
    await this.clientRepo.delete(id);
    return { id };
  }
}
