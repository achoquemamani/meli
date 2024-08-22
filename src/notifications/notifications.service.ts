import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MeteorologicalService } from './meteorological.service/meteorological.service';
import { Forecast } from './models/forecast';
import { WaveForecast } from './models/wave.forecast';
import { Result } from '../utils/result';
import { Subscriber } from '../subscribers/models/subscriber.entity';
import { SubscribersService } from '../subscribers/subscribers.service';
import { Notification } from './models/notification';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  constructor(
    private meteorologicalService: MeteorologicalService,
    private subscribersService: SubscribersService,
  ) {}

  @Cron('0 9 * * *')
  async handleCron() {
    await this.sendNotifications();
  }

  public async sendNotifications() {
    try {
      this.logger.log(`SENDING NOTIFICATIONS: ${Result.IN_PROGRESS}`);
      const enabledSubscribers: Subscriber[] =
        await this.subscribersService.find({
          isEnabled: true,
        });
      enabledSubscribers.forEach(async (subscriber) => {
        const externalId = subscriber.city.externalId;
        const forecasts = await this.getForecastByCity(externalId);
        const waveForecast = await this.getWaveForecastByCity(externalId);
        const notification: Notification = new Notification(
          forecasts,
          waveForecast,
          subscriber,
        );
        const message = notification.getMessage();
        subscriber.sendNotifications(message);
      });
      this.logger.log(`SENDING NOTIFICATIONS: ${Result.SUCCESS}`);
    } catch {
      this.logger.log(`SENDING NOTIFICATIONS: ${Result.FAIL}`);
    }
  }

  public async getForecastByCity(cityId: number): Promise<Forecast[]> {
    try {
      return await this.meteorologicalService.getForecastByCity(cityId);
    } catch (e) {
      throw e;
    }
  }

  public async getWaveForecastByCity(cityId: number): Promise<WaveForecast> {
    try {
      return this.meteorologicalService.getWaveForecastByCity(cityId);
    } catch (e) {
      throw e;
    }
  }
}
