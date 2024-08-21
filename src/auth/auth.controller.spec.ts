import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ExceptionHandling } from '../utils/exception.handling';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/user.entity';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UsersService,
        { provide: UsersService, useValue: User },
        AuthService,
        ExceptionHandling,
        { provide: UsersService, useValue: User },
        { provide: JwtService, useClass: JwtService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
