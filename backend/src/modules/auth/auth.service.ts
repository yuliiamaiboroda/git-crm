import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { createHash } from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import * as argon2 from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

import { AuthDto } from './dto';
import { AuthResponse } from './responses';

import { User } from 'src/entities/postgres/user.entity';
import { UserSession } from 'src/entities/mongoDB/user-session.entity';

import { UserTokenData } from 'src/types/auth.types';

@Injectable()
export class AuthService {
  tokenTtl = this.configService.getOrThrow('token.ttl');
  tokenSecret = this.configService.getOrThrow('token.secret');

  constructor(
    @InjectModel(UserSession.name) private userSessionModel: Model<UserSession>,

    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async login(authDto: AuthDto): Promise<AuthResponse> {
    const { email, password } = authDto;

    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) throw new UnauthorizedException();

    const secret = this.generateSecret();
    await this.userSessionModel.updateOne(
      { userId: user.id },
      { secret },
      { upsert: true },
    );

    const token = this.generateUserToken(user, secret);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;

    return {
      user: userData,
      token,
    };
  }

  async register(authDto: AuthDto): Promise<AuthResponse> {
    const { email, password } = authDto;

    const userInstance = await this.userService.findByEmail(email);
    if (userInstance) throw new ConflictException('User already exists');

    const hashedPassword = await argon2.hash(password);
    const user = await this.userService.create({
      email,
      password: hashedPassword,
    });

    const secret = this.generateSecret();
    await this.userSessionModel.create({
      userId: user.id,
      secret,
    });

    const token = this.generateUserToken(user, secret);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;

    return {
      user: userData,
      token,
    };
  }

  async logout(userId: number): Promise<void> {
    await this.userSessionModel.updateOne({ userId }, { secret: null });
  }

  private generateSecret(): string {
    return createHash('sha256').update(uuid()).digest('hex');
  }

  private generateUserToken(user: User, secret: string): string {
    const payload: UserTokenData = {
      id: user.id,
      email: user.email,
      password: user.password,
      secret,
    };

    return sign(payload, this.tokenSecret, {
      expiresIn: this.tokenTtl,
    });
  }

  verifyUserToken(token: string): UserTokenData {
    return verify(token, this.tokenSecret, {
      ignoreExpiration: false,
    }) as UserTokenData;
  }
}
