import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ExceptionHandling } from '../utils/exception.handling';
import { SubscribersService } from './subscribers.service';
import { Subscriber } from './models/subscriber.entity';

@ApiTags('Subscribers')
@Controller('subscribers')
export class SubscribersController {
  private readonly LOGGER = new Logger(SubscribersController.name);
  constructor(
    private subscribersService: SubscribersService,
    private exceptionHandling: ExceptionHandling,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiQuery({
    name: 'isEnabled',
    type: Boolean,
    description: 'Filter for enabled',
    required: false,
  })
  async getSubscribers(
    @Query('isEnabled') isEnabled: string,
  ): Promise<Subscriber[]> {
    try {
      const params = {
        isEnabled: undefined,
      };
      if (isEnabled) {
        params.isEnabled = isEnabled === 'true';
      }
      return await this.subscribersService.find(params);
    } catch (error) {
      this.exceptionHandling.handleException(this.LOGGER, error);
    }
  }
}
