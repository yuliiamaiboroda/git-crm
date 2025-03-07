import { forwardRef, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  UserSession,
  UserSessionSchema,
} from 'src/entities/mongoDB/user-session.entity';

import { UserModule } from '../user/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSession.name, schema: UserSessionSchema },
    ]),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    AuthService,
    MongooseModule.forFeature([
      { name: UserSession.name, schema: UserSessionSchema },
    ]),
  ],
})
export class AuthModule {}
