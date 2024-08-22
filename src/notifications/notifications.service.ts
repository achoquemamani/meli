import { Injectable, Logger } from '@nestjs/common';
import { MeteorologicalService } from './meteorological.service/meteorological.service';
import { Forecast } from './models/forecast';
import { WaveForecast } from './models/wave.forecast';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  constructor(private meteorologicalService: MeteorologicalService) {}

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
