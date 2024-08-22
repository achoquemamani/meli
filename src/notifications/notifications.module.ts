import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MeteorologicalService } from './meteorological.service/meteorological.service';
import { MeteorologicalServiceCPTEC } from './meteorological.service/meteorological.CPTEC.service';
import { ExceptionHandling } from '../utils/exception.handling';
import { SubscribersService } from '../subscribers/subscribers.service';
import { subscribersProviders } from '../subscribers/subscribers.provider';

@Module({
  providers: [
    NotificationsService,
    MeteorologicalService,
    MeteorologicalServiceCPTEC,
    ExceptionHandling,
    SubscribersService,
    ...subscribersProviders,
  ],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
