import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Subscriber } from './models/subscriber.entity';
import { Result } from '../utils/result';
import { City } from './models/city.entity';
import { ContactMethod } from './models/contactMethod';

@Injectable()
export class SubscribersService {
  private readonly logger = new Logger(SubscribersService.name);
  constructor(
    @Inject('SUBSCRIBERS_REPOSITORY')
    private subscribersRepository: typeof Subscriber,
  ) {}

  async find(params: { isEnabled?: boolean }): Promise<Subscriber[]> {
    try {
      this.logger.log(`GET SUBSCRIBERS: ${Result.IN_PROGRESS}`);
      const options = {
        include: [City, ContactMethod],
        where: {},
      };
      if (params.isEnabled !== undefined) {
        options.where = {
          isEnabled: params.isEnabled,
        };
      }
      const subscribers =
        this.subscribersRepository.findAll<Subscriber>(options);
      this.logger.log(`GET SUBSCRIBERS: ${Result.SUCCESS}`);
      return subscribers;
    } catch (ex) {
      this.logger.log(`GET SUBSCRIBERS: ${Result.FAIL}`);
      throw ex;
    }
  }

  @Cron('45 * * * * *')
  async handleCron() {
    try {
      this.logger.log(`SENDING NOTIFICATIONS: ${Result.IN_PROGRESS}`);
      const enabledSubscribers: Subscriber[] = await this.find({
        isEnabled: true,
      });
      enabledSubscribers.forEach((subscriber) => {
        subscriber.contactMethods.forEach((contactMethod) => {
          contactMethod.sendNotification('');
        });
      });
      this.logger.log(`SENDING NOTIFICATIONS: ${Result.SUCCESS}`);
    } catch {
      this.logger.log(`SENDING NOTIFICATIONS: ${Result.FAIL}`);
    }
  }
}
