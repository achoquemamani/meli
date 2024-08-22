import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import constants from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Role } from '../users/models/roles/role.enum';
import { ROLES_KEY } from '../users/models/roles/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

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
        secret: constants.call('configuration').secretJwt,
      });
      request['user'] = payload;
    } catch (e) {
      const error = {
        name: e.name,
        message: e.message,
        description: e.expiredAt,
      };
      this.logger.error(JSON.stringify(error));
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
