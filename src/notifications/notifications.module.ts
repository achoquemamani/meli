import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MeteorologicalService } from './meteorological.service/meteorological.service';
import { MeteorologicalServiceCPTEC } from './meteorological.service/meteorological.CPTEC.service';
import { ExceptionHandling } from 'src/utils/exception.handling';

@Module({
  providers: [
    NotificationsService,
    MeteorologicalService,
    MeteorologicalServiceCPTEC,
    ExceptionHandling,
  ],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
