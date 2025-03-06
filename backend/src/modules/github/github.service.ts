import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from '@octokit/rest';
import { RestEndpointMethodTypes } from '@octokit/rest';
import { UserService } from '../user/user.service';
import { ProjectService } from '../project/project.service';

@Injectable()
export class GithubService {
  private readonly githubClient: Octokit;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {
    this.githubClient = new Octokit({
      auth: this.configService.getOrThrow('github.accessToken'),
    });
  }

  async handleUserAddedProject(
    userId: number,
    projectId: number,
  ): Promise<void> {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const project = await this.projectService.findProjectById(projectId);
    const username = project.name.split('/')[0];
    const projectName = project.name.split('/')[1];
    const repo = await this.getGithubRepoByOwnerAndName(username, projectName);

    if (repo.status !== 200)
      throw new NotFoundException('Repository not found');

    const url = repo.data.html_url;
    const stars = repo.data.stargazers_count;
    const forks = repo.data.forks_count;
    const issues = repo.data.open_issues_count;

    await this.projectService.updateProjectById(projectId, {
      url,
      stars,
      forks,
      issues,
    });
  }

  private readonly getGithubRepoByOwnerAndName = async (
    owner: string,
    name: string,
  ): Promise<RestEndpointMethodTypes['repos']['get']['response']> => {
    const repo = await this.githubClient.rest.repos.get({
      owner,
      repo: name,
    });
    return repo;
  };
}
