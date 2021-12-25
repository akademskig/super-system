import { InputType, PartialType } from '@nestjs/graphql';
import { RegisterInput } from './register.input';

@InputType()
export class SignInInput extends PartialType(RegisterInput) {}
