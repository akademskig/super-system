import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class GQLCustomGuard extends AuthGuard('custom') {
  constructor(private readonly authService: AuthService) {
    super();
  }
  getRequest(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  validate(req): Promise<any> {
    console.log(req, 'req');
    const { email, password } = req.body;
    return this.authService.validateUser(email, password);
  }
}
