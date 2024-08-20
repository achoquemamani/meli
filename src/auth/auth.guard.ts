import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import constants from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Role } from '../users/roles/role.enum';
import { ROLES_KEY } from '../users/roles/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: constants.call('jwtConstants').secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    const user = request.user;
    const isAllowed =
      requiredRoles.some((role) => user.role === role) ||
      requiredRoles.some((role) => role === Role.Public);
    return isAllowed;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
