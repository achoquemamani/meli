import { Subscriber } from '../../subscribers/models/subscriber.entity';
import { City } from '../../subscribers/models/city.entity';
import { Forecast } from './forecast';
import { WaveForecast } from './wave.forecast';

export class Notification {
  subscriber: Subscriber;
  forecasts: Forecast[];
  waveForecast: WaveForecast;

  constructor(
    forecasts: Forecast[],
    waveForecast: WaveForecast,
    subscriber: Subscriber,
  ) {
    this.forecasts = forecasts;
    this.waveForecast = waveForecast;
    this.subscriber = subscriber;
  }

  public getMessage() {
    const subscriberInformation = `${this.subscriber.fullname} - ExternalId: ${this.subscriber.city.externalId}`;
    const forecastsMessage = this.forecasts
      .map((forecast) => {
        return forecast.getMessage();
      })
      .join('\n');
    const waveForecastMessage = this.subscriber.city.isCoastal(
      this.waveForecast.morning,
    )
      ? this.waveForecast.getMessage()
      : 'Sin pronóstico de olas';
    return `${subscriberInformation}\n${subscriberInformation}\n${forecastsMessage}\n${waveForecastMessage}`;
  }
}
