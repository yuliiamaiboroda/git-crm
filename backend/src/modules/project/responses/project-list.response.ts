import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/entities/postgres/project.entity';

export class ProjectListResponse {
  @ApiProperty({ type: [Project] })
  data: Project[];

  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Number })
  page: number;

  @ApiProperty({ type: Number })
  totalPages: number;
}
