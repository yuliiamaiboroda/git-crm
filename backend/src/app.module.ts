import { Module } from '@nestjs/common';

import { MongoDBProvider } from './providers/MongoDB.provider';
import { PostgresProvider } from './providers/Postgres.provider';
import { ConfigProvider } from './providers/Config.provider';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MongoDBProvider,
    PostgresProvider,
    ConfigProvider,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
