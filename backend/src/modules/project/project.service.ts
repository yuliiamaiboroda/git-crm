import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Project } from 'src/entities/postgres/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { GIT_CRM_SERVICE } from 'src/providers/RabbitMQ.provider';
import { lastValueFrom } from 'rxjs';
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
    const project = this.projectRepository.create({
      ...data,
      ownerId: userId,
    });

    await lastValueFrom(
      this.gitCrmService.emit(USER_CREATED_PROJECT, {
        payload: {
          userId,
          projectId: project.id,
        },
      } as userCreatedProjectData),
    );

    return this.projectRepository.save(project);
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
      where: { ownerId: userId },
      skip: skip && skip,
      take: take && take,
      order: {
        updatedDate: 'DESC',
      },
    });
  }

  async countAllProjectsByUserId(userId: number): Promise<number> {
    return this.projectRepository.count({ where: { ownerId: userId } });
  }
}
