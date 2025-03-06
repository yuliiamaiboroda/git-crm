import { Module } from '@nestjs/common';

import { MongoDBProvider } from './providers/MongoDB.provider';
import { PostgresProvider } from './providers/Postgres.provider';
import { ConfigProvider } from './providers/Config.provider';
import { GitCrmServiceProvider } from './providers/RabbitMQ.provider';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { GithubModule } from './modules/github/github.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [
    MongoDBProvider,
    PostgresProvider,
    ConfigProvider,
    GitCrmServiceProvider,

    AuthModule,
    UserModule,
    GithubModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
