import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongoDBProvider } from './providers/MongoDB.provider';
import { PostgresProvider } from './providers/Postgres.provider';
import { ConfigProvider } from './providers/Config.provider';

@Module({
  imports: [MongoDBProvider, PostgresProvider, ConfigProvider],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
