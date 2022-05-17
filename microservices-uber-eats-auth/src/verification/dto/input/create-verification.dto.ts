import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { VerifiedBy } from 'src/verification/verification.entity';

@InputType()
export class CreateVerificationInput {
  @Field()
  @IsNotEmpty()
  @IsBoolean()
  verifiedBy?: VerifiedBy.Email;

  @Field()
  @IsNotEmpty()
  @IsString()
  verificationToken!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  expiresIn!: string;

  @Field()
  @IsBoolean()
  isVerified?: boolean;
}
