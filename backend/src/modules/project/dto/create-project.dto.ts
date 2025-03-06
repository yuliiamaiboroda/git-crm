import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[^/]+\/[^/]+$/, {
    message: 'Invalid project name format. Use owner/repo-name format.',
  })
  @ApiProperty()
  name: string;
}
