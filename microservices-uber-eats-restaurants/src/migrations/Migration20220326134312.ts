import { Migration } from '@mikro-orm/migrations';

export class Migration20220326134312 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "restaurants" ("id" varchar(255) not null, "example_field" int not null);',
    );
    this.addSql(
      'alter table "restaurants" add constraint "restaurants_pkey" primary key ("id");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "restaurants" cascade;');
  }
}
