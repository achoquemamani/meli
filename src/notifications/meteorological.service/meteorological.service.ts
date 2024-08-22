import { Injectable, Logger } from '@nestjs/common';
import { Result } from '../../utils/result';
import { Forecast } from '../models/forecast';
import { WaveForecast } from '../models/wave.forecast';
import { MeteorologicalServiceCPTEC } from './meteorological.CPTEC.service';
const { convertXML } = require('simple-xml-to-json');

@Injectable()
export class MeteorologicalService {
  private readonly logger = new Logger(MeteorologicalService.name);
  constructor(private meteorologicalServiceCPTEC: MeteorologicalServiceCPTEC) {}

  public async getForecastByCity(cityId: number): Promise<Forecast[]> {
    try {
      this.logger.log(`GETTING FORECASTS: ${Result.IN_PROGRESS}`);
      const response =
        await this.meteorologicalServiceCPTEC.getForecastByCity(cityId);
      const responseJson = convertXML(response);
      const forecasts: Forecast[] = responseJson.cidade.children
        .filter((child) => {
          return JSON.stringify(child.previsao);
        })
        .map((child) => {
          return {
            day: child.previsao.children[0].dia.content,
            time: child.previsao.children[1].tempo.content,
            maximum: parseInt(child.previsao.children[2].maxima.content),
            minimum: parseInt(child.previsao.children[3].minima.content),
            iuv: parseFloat(child.previsao.children[4].iuv.content),
          };
        });
      this.logger.log(`GETTING FORECASTS: ${Result.SUCCESS}`);
      return forecasts;
    } catch (e) {
      this.logger.log(`GETTING FORECASTS: ${Result.FAIL}`);
      throw e;
    }
  }

  public async getWaveForecastByCity(cityId: number): Promise<WaveForecast> {
    try {
      this.logger.log(`GETTING WAVE FORECASTS: ${Result.IN_PROGRESS}`);
      const response =
        await this.meteorologicalServiceCPTEC.getWaveForecastByCity(cityId);
      const responseJson = convertXML(response);
      const waveForecastNodes = responseJson.cidade.children.filter((child) => {
        return (
          JSON.stringify(child.manha) ||
          JSON.stringify(child.tarde) ||
          JSON.stringify(child.noite)
        );
      });
      const getPeriod = (periodJson) => {
        return {
          day: periodJson.children[0].dia.content,
          agitacao: periodJson.children[1].agitacao.content,
          altura: parseFloat(periodJson.children[2].altura.content),
          direcao: periodJson.children[3].direcao.content,
          vento: parseFloat(periodJson.children[4].vento.content),
          vento_dir: periodJson.children[5].vento_dir.content,
        };
      };

      const waveForecast: WaveForecast = {
        morning: getPeriod(waveForecastNodes[0].manha),
        afternoon: getPeriod(waveForecastNodes[1].tarde),
        evening: getPeriod(waveForecastNodes[2].noite),
      };
      this.logger.log(`GETTING WAVE FORECASTS: ${Result.SUCCESS}`);
      return waveForecast;
    } catch (e) {
      this.logger.log(`GETTING WAVE FORECASTS: ${Result.FAIL}`);
      throw e;
    }
  }
}
