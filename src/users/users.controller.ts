import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './models/user.entity';
import { ExceptionHandling } from '../utils/exception.handling';

@ApiTags('Auth')
@Controller('users')
export class UsersController {
  private readonly LOGGER = new Logger(UsersController.name);
  constructor(
    private usersService: UsersService,
    private exceptionHandling: ExceptionHandling,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getUsers(): Promise<User[]> {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      this.exceptionHandling.handleException(this.LOGGER, error);
    }
  }
}
