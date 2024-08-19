import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { ExceptionHandling } from '../utils/exception.handling';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.provider';

@Module({
  providers: [
    SeedService,
    UsersService,
    ExceptionHandling,
    ...databaseProviders,
    ...usersProviders,
  ],
  exports: [...databaseProviders],
  controllers: [SeedController],
})
export class DatabaseModule {}
