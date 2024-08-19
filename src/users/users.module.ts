import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ExceptionHandling } from '../utils/exception.handling';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.provider';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ExceptionHandling, ...usersProviders],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
