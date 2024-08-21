import { Module } from '@nestjs/common';
import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './subscribers.service';
import { DatabaseModule } from '../database/database.module';
import { subscribersProviders } from './subscribers.provider';
import { ExceptionHandling } from 'src/utils/exception.handling';

@Module({
  imports: [DatabaseModule],
  controllers: [SubscribersController],
  providers: [SubscribersService, ExceptionHandling, ...subscribersProviders],
})
export class SubscribersModule {}
