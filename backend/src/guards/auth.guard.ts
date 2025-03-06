import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Request } from 'express';
import { Model } from 'mongoose';

import { UserService } from 'src/modules/user/user.service';
import { AuthService } from 'src/modules/auth/auth.service';

import { User } from 'src/entities/postgres/user.entity';
import { UserSession } from 'src/entities/mongoDB/user-session.entity';

import { UserTokenData } from 'src/types/auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(UserSession.name) private userSessionModel: Model<UserSession>,

    private authService: AuthService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: UserTokenData = this.authService.verifyUserToken(token);
      const user: User = await this.validateUserInDatabase(payload);
      await this.validateUserSession(payload);

      request['user'] = user;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async validateUserInDatabase(payload: UserTokenData): Promise<User> {
    const user: User = await this.userService.findById(payload.id);
    if (!user) throw new UnauthorizedException();

    const isPasswordValid = user.password === payload.password;
    if (!isPasswordValid) throw new UnauthorizedException();

    return user;
  }

  private async validateUserSession(payload: UserTokenData): Promise<void> {
    const userSession: UserSession = await this.userSessionModel.findOne({
      userId: payload.id,
      secret: payload.secret,
    });
    if (!userSession) throw new UnauthorizedException();
  }
}
