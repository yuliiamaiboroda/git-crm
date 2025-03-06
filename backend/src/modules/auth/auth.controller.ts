import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthResponse } from './responses';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
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
}
