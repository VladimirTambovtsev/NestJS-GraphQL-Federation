import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { VerificationModule } from './verification/verification.module';
import { join } from 'path';
import { User } from './users/user';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MailModule,
    VerificationModule,

    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    MikroOrmModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/auth.schema.gql'),
    }),
  ],
})
export class AppModule {}
