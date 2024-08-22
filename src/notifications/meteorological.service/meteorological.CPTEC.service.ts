import { Injectable } from '@nestjs/common';
import { WaveForecast } from '../models/wave.forecast';
import constants from '../../auth/constants';
import axios from 'axios';

@Injectable()
export class MeteorologicalServiceCPTEC {
  private apiUrl: string;
  constructor() {
    this.apiUrl = constants.call('configuration').CPTECApiUrl;
  }

  public async getForecastByCity(cityId: number): Promise<string> {
    try {
      const { data: response } = await axios.get(
        `${this.apiUrl}/cidade/${cityId}/previsao.xml`,
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  public async getWaveForecastByCity(cityId: number): Promise<string> {
    try {
      const { data: response } = await axios.get(
        `${this.apiUrl}/cidade/${cityId}/dia/0/ondas.xml`,
      );
      return response;
    } catch (e) {
      throw e;
    }
  }
}
