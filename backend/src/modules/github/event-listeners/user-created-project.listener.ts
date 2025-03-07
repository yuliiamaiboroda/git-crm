import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { GithubService } from '../github.service';

import {
  USER_CREATED_PROJECT,
  userCreatedProjectData,
} from 'src/events/user/user-created-project.event';

@Controller()
export class UserCreatedProjectListener {
  constructor(private readonly githubService: GithubService) {}

  @EventPattern(USER_CREATED_PROJECT)
  async handle(
    @Payload() { payload: { userId, projectId } }: userCreatedProjectData,
  ) {
    await this.githubService.handleUserAddedProject(userId, projectId);
  }
}
