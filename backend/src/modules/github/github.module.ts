import { forwardRef, Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { UserCreatedProjectListener } from './event-listeners/user-created-project.listener';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [forwardRef(() => ProjectModule)],
  controllers: [UserCreatedProjectListener],
  providers: [GithubService],
})
export class GithubModule {}
