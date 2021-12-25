import { Controller, Get, Query, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/verify_email')
  async verifyEmail(@Query() { email, token }) {
    try {
      return this.authService.verifyUser({ email, token });
    } catch (error) {
      Logger.error('Error', JSON.stringify(error), 'AuthController');
    }
  }
}
