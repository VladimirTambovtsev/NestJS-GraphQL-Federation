import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateVerificationInput } from './dto/input/create-verification.dto';
import { VerificationEntity } from './verification.entity';

@Injectable()
export class VerificationService {
  constructor(
    private readonly orm: MikroORM,
    @InjectRepository(VerificationEntity)
    private readonly verificationRepository: EntityRepository<VerificationEntity>,
  ) {}

  async findOneByVerificationToken(verificationToken: string) {
    return await this.verificationRepository.findOne({ verificationToken });
  }

  async listAll() {
    return await this.verificationRepository.findAll();
  }

  async create({
    verificationToken,
    expiresIn: expireAt,
  }: CreateVerificationInput) {
    try {
      const verification = await this.verificationRepository.create({
        id: uuidv4(),
        isVerified: false,
        verificationToken: verificationToken,
        expiresIn: expireAt,
      });
      await this.verificationRepository.persistAndFlush(verification);
      return verification;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async setVerified(verificationDto: CreateVerificationInput) {
    return await this.verificationRepository.nativeUpdate(
      {
        verificationToken: verificationDto.verificationToken,
      },
      {
        ...verificationDto,
        isVerified: true,
      },
    );
  }

  async delete(uId: string, token: string) {
    // return await this.tokenModel.deleteOne({ uId, token });
  }
}
