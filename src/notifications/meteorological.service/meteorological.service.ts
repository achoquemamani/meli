import { Injectable, Logger } from '@nestjs/common';
import { Result } from '../../utils/result';
import { Forecast } from '../models/forecast';
import { Period, WaveForecast } from '../models/wave.forecast';
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
          const day = child.previsao.children[0].dia.content;
          const time = child.previsao.children[1].tempo.content;
          const maximum = parseInt(child.previsao.children[2].maxima.content);
          const minimum = parseInt(child.previsao.children[3].minima.content);
          const iuv = parseFloat(child.previsao.children[4].iuv.content);
          const forecast = new Forecast(day, time, maximum, minimum, iuv);
          return forecast;
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
        const day = periodJson.children[0].dia.content;
        const agitacao = periodJson.children[1].agitacao.content;
        const altura = parseFloat(periodJson.children[2].altura.content);
        const direcao = periodJson.children[3].direcao.content;
        const vento = parseFloat(periodJson.children[4].vento.content);
        const vento_dir = periodJson.children[5].vento_dir.content;
        const period = new Period(
          day,
          agitacao,
          altura,
          direcao,
          vento,
          vento_dir,
        );
        return period;
      };

      const morning = getPeriod(waveForecastNodes[0].manha);
      const afternoon = getPeriod(waveForecastNodes[1].tarde);
      const evening = getPeriod(waveForecastNodes[2].noite);
      const waveForecast: WaveForecast = new WaveForecast(
        morning,
        afternoon,
        evening,
      );
      this.logger.log(`GETTING WAVE FORECASTS: ${Result.SUCCESS}`);
      return waveForecast;
    } catch (e) {
      this.logger.log(`GETTING WAVE FORECASTS: ${Result.FAIL}`);
      throw e;
    }
  }
}
