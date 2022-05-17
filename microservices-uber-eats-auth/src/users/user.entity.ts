import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';

export enum Role {
  Courier = 'сourier',
  Customer = 'customer',
}

@Entity({ tableName: 'users' })
export class UserEntity {
  //   @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  @PrimaryKey()
  id = v4();
  // @PrimaryKey()
  // id!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  email!: string;

  // TODO: set min / max length / regexp
  // @Property({ hidden: true })
  @Property()
  password!: string;

  @Property({ default: false, nullable: true })
  isBanned?: boolean;

  @Property()
  age?: number;

  @Enum({ default: [Role.Customer] })
  roles = [Role.Customer];
}
