import { Controller, UseGuards, Get, Query, Res, Param, Post, Body, Put, Delete, Logger, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { RolesGuard } from '../guards/roles.guard';
import { AdminOrOwnerGuard } from '../guards/adminOrOwner.guard';
import { AuthService } from '../auth/auth.service';
import { OwnerGuard } from '../guards/owner.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    ) { }

    @UseGuards(RolesGuard)
    @Get('/')
    async getAll(@Query() query, @Res() res) {
      const users = await this.usersService.getAll(query);
      res.set('X-Total-Count', users.count);
      res.set('Access-Control-Expose-Headers', ['X-Total-Count']);
      res.send(users.data);
    }
    @UseGuards(AdminOrOwnerGuard)
    @Get(':id')
    async getOne(@Param() id) {
      return this.usersService.findOne(id);
    }
    @UseGuards(AdminOrOwnerGuard)
    @Put(':id')
    async updateOne(@Param() id, @Body() user) {
      return this.usersService.updateOne(id, user);
    }
    @UseGuards(OwnerGuard)
    @Put('/change_password/:id')
    async changePassword(@Param() id, @Body() passwords) {
        try {
            return this.usersService.updatePassword(id, passwords);
        } catch (error) {
            Logger.error('Error', JSON.stringify(error), 'UsersController');
        }
    }
    @UseGuards(RolesGuard)
    @Delete(':id')
    async deleteById(@Param() id) {
      return this.usersService.deleteById(id);
    }
    @UseGuards(RolesGuard)
    @Post()
    async createNew(@Body() user) {
      return this.usersService.createNew(user);
    }
}
