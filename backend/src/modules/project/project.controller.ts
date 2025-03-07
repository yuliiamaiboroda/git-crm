import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ProjectService } from './project.service';

import { User } from 'src/entities/postgres/user.entity';
import { Project } from 'src/entities/postgres/project.entity';

import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorators/user.decorator';

import { ProjectListResponse } from './responses/project-list.response';
import { CreateProjectDto } from './dto/create-project.dto';

import {
  getTotalPages,
  normalizePaginationForDB,
  validatePaginationInQuery,
} from 'src/utils';

@ApiTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiResponse({
    status: 200,
    description: 'All projects',
    type: ProjectListResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async getProjects(
    @CurrentUser() user: User,
    @Query('page') pageQuery: number,
    @Query('limit') limitQuery: number,
  ): Promise<ProjectListResponse> {
    const { page, limit } = validatePaginationInQuery({
      page: pageQuery,
      limit: limitQuery,
    });
    const { skip, take } = normalizePaginationForDB({ page, limit });

    const projects = await this.projectService.findAllProjectsByUserId(
      user.id,
      skip,
      take,
    );

    const total = await this.projectService.countAllProjectsByUserId(user.id);
    const totalPages = getTotalPages({ total, limit });

    return {
      data: projects,
      total,
      page,
      totalPages,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Project',
    type: Project,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async getProjectById(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<Project> {
    const project = await this.projectService.findProjectById(id);

    if (!project || project?.userId !== user.id) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  @Post()
  @ApiOperation({ summary: 'Create project' })
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({
    status: 201,
    description: 'Project created',
    type: Project,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async createProject(
    @CurrentUser() user: User,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectService.createProject(user.id, createProjectDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update project' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: Project })
  @ApiResponse({
    status: 200,
    description: 'Project updated',
    type: Project,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async updateProject(
    @CurrentUser() user: User,
    @Param('id') id: number,
    @Body() updateProjectDto: Partial<Project>,
  ): Promise<Project> {
    const project = await this.projectService.findProjectById(id);

    if (!project || project?.userId !== user.id) {
      throw new NotFoundException('Project not found');
    }

    return this.projectService.updateProjectById(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Project deleted',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async deleteProject(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<void> {
    const project = await this.projectService.findProjectById(id);

    if (!project || project?.userId !== user.id) {
      throw new NotFoundException('Project not found');
    }

    return this.projectService.deleteProjectById(id);
  }
}
