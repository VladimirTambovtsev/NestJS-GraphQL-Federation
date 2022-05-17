import { UsersService } from './../users/users.service';
import { VerificationEntity } from './verification.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';

@Module({
  imports: [MikroOrmModule.forFeature([VerificationEntity])],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
