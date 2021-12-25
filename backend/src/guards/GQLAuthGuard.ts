import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GQLAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
