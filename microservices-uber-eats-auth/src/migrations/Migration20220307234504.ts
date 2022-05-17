import { Migration } from '@mikro-orm/migrations';

export class Migration20220307234504 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "verifications" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "verification_token" varchar(255) not null, "expires_in" varchar(255) not null, "is_verified" boolean null default false);');
    this.addSql('alter table "verifications" add constraint "verifications_pkey" primary key ("id");');

    this.addSql('create table "users" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, "is_banned" boolean null default false, "age" int null, "roles" text[] not null default \'{customer}\');');
    this.addSql('alter table "users" add constraint "users_pkey" primary key ("id");');
  }

}
