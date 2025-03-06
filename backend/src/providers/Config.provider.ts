import { ConfigModule } from '@nestjs/config';
import postgresConfig from '../config/postgres.config';
import mongoDBConfig from '../config/mongoDB.config';

export const ConfigProvider = ConfigModule.forRoot({
  isGlobal: true,
  load: [postgresConfig, mongoDBConfig],
});
