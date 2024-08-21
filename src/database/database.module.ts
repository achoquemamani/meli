import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ExceptionHandling } from '../utils/exception.handling';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.provider';

@Module({
  providers: [
    UsersService,
    ExceptionHandling,
    ...databaseProviders,
    ...usersProviders,
  ],
  exports: [...databaseProviders],
  controllers: [],
})
export class DatabaseModule {}
