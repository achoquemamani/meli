import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExceptionHandling } from '../utils/exception.handling';
import { SignInDto } from '../users/dto/loginuser';
import { Roles } from '../users/models/roles/roles.decorator';
import { Role } from '../users/models/roles/role.enum';
import { User } from '../users/models/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly LOGGER = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private exceptionHandling: ExceptionHandling,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ access_token: string }> {
    try {
      const response = await this.authService.signIn(
        signInDto.username,
        signInDto.password,
      );
      return response;
    } catch (error) {
      this.exceptionHandling.handleException(this.LOGGER, error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async createUser(@Body() user: User): Promise<User> {
    try {
      const createdApplication = await this.usersService.create(user);
      return createdApplication;
    } catch (error) {
      this.exceptionHandling.handleException(this.LOGGER, error);
    }
  }

  @Roles(Role.Public)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
