import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { Repository } from 'typeorm';

import { GIT_CRM_SERVICE } from 'src/providers/RabbitMQ.provider';

import { Project } from 'src/entities/postgres/project.entity';

import { CreateProjectDto } from './dto/create-project.dto';
import {
  USER_CREATED_PROJECT,
  userCreatedProjectData,
} from 'src/events/user/user-created-project.event';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(GIT_CRM_SERVICE)
    private readonly gitCrmService: ClientProxy,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(
    userId: number,
    data: CreateProjectDto,
  ): Promise<Project> {
    const { ownerName, projectName } = this.transformProjectPath(data.name);

    const project = this.projectRepository.create({
      ...data,
      ownerName,
      name: projectName,
      userId,
    });

    const savedProject = await this.projectRepository.save(project);

    await lastValueFrom(
      this.gitCrmService.emit(USER_CREATED_PROJECT, {
        payload: {
          userId,
          projectId: savedProject.id,
        },
      } as userCreatedProjectData),
    );

    return savedProject;
  }

  async updateProjectById(
    projectId: number,
    data: Partial<Project>,
  ): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id: projectId });
    if (!project) throw new NotFoundException('Project not found');

    return this.projectRepository.save({
      ...project,
      ...data,
    });
  }

  async deleteProjectById(projectId: number): Promise<void> {
    const project = await this.projectRepository.findOneBy({ id: projectId });
    if (!project) throw new NotFoundException('Project not found');

    await this.projectRepository.delete(projectId);
  }

  async findProjectById(projectId: number): Promise<Project> {
    return this.projectRepository.findOneBy({ id: projectId });
  }

  async findAllProjectsByUserId(
    userId: number,
    skip?: number,
    take?: number,
  ): Promise<Project[]> {
    return this.projectRepository.find({
      where: { userId },
      skip: skip && skip,
      take: take && take,
      order: { id: 'ASC' },
    });
  }

  async countAllProjectsByUserId(userId: number): Promise<number> {
    return this.projectRepository.count({ where: { userId } });
  }

  private transformProjectPath(projectPath: string): {
    ownerName: string;
    projectName: string;
  } {
    const [ownerName, projectName] = projectPath.split('/');

    return {
      ownerName,
      projectName,
    };
  }
}
