import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { ExceptionHandling } from '../utils/exception.handling';
import { Forecast } from './models/forecast';
import { WaveForecast } from './models/wave.forecast';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  private readonly LOGGER = new Logger(NotificationsController.name);

  constructor(
    private notificationsService: NotificationsService,
    private exceptionHandling: ExceptionHandling,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('getForecasts')
  @ApiQuery({
    name: 'cityId',
    type: Number,
    description: 'City external id',
    required: false,
  })
  async getForecasts(@Query('cityId') cityId: string): Promise<Forecast[]> {
    try {
      return await this.notificationsService.getForecastByCity(
        parseInt(cityId),
      );
    } catch (error) {
      this.exceptionHandling.handleException(this.LOGGER, error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('getWaveForecast')
  @ApiQuery({
    name: 'cityId',
    type: Number,
    description: 'City external id',
    required: false,
  })
  async getWaveForecasts(
    @Query('cityId') cityId: string,
  ): Promise<WaveForecast> {
    try {
      return await this.notificationsService.getWaveForecastByCity(
        parseInt(cityId),
      );
    } catch (error) {
      this.exceptionHandling.handleException(this.LOGGER, error);
    }
  }
}
