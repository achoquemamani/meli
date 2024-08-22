export class Forecast {
  day: string;
  time: string;
  maximum: number;
  minimum: number;
  iuv: number;

  constructor(
    day: string,
    time: string,
    maximum: number,
    minimum: number,
    iuv: number,
  ) {
    this.day = day;
    this.time = time;
    this.maximum = maximum;
    this.minimum = minimum;
    this.iuv = iuv;
  }

  public getMessage() {
    return `Day: ${this.day} - Time: ${this.time} - Maximun: ${this.maximum} - Minimum ${this.minimum} - Iuv: ${this.iuv}`;
  }
}
