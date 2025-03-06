import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthResponse } from './responses';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/entities/postgres/user.entity';
import { CurrentUser } from 'src/decorators/user.decorator';

@ApiTags('auth')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: AuthResponse })
  @ApiBody({ type: AuthDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('login')
  async login(@Body() authDto: AuthDto): Promise<AuthResponse> {
    return this.authService.login(authDto);
  }

  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, type: AuthResponse })
  @ApiBody({ type: AuthDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('register')
  async register(@Body() authDto: AuthDto): Promise<AuthResponse> {
    return this.authService.register(authDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 204 })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@CurrentUser() user: User): Promise<void> {
    return this.authService.logout(user.id);
  }
}
