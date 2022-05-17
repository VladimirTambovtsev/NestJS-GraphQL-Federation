import { ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { User } from 'src/users/user';

@ObjectType()
export class UserOutput extends PartialType(OmitType(User, ['password'])) {}
