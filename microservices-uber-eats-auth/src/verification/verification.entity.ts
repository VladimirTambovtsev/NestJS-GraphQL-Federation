import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

export enum VerifiedBy {
  Email = 'email',
  // can be extended by phone, sms, etc..
}

/**
 * Users Accounts verifications by email
 */
@Entity({ tableName: 'verifications' })
export class VerificationEntity {
  // @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  @PrimaryKey()
  id!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  // @Enum({ nullable: true })
  // verifiedBy?: [VerifiedBy];

  @Property()
  verificationToken!: string;

  @Property()
  expiresIn!: string;

  @Property({ default: false })
  isVerified?: boolean;
}
