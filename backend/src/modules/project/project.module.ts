import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/postgres/project.entity';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserSession,
  UserSessionSchema,
} from 'src/entities/mongoDB/user-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    MongooseModule.forFeature([
      { name: UserSession.name, schema: UserSessionSchema },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
