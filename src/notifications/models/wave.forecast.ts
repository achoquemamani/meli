export class Period {
  day: string;
  agitacao: string;
  altura: number;
  direcao: string;
  vento: number;
  vento_dir: string;

  constructor(
    day: string,
    agitacao: string,
    altura: number,
    direcao: string,
    vento: number,
    vento_dir: string,
  ) {
    this.day = day;
    this.agitacao = agitacao;
    this.altura = altura;
    this.direcao = direcao;
    this.vento = vento;
    this.vento_dir = vento_dir;
  }

  public getMessage() {
    return `Day: ${this.day} - Agitacao: ${this.agitacao}`;
  }
}

export class WaveForecast {
  morning: Period;
  afternoon: Period;
  evening: Period;

  constructor(morning: Period, afternoon: Period, evening: Period) {
    this.morning = morning;
    this.afternoon = afternoon;
    this.evening = evening;
  }

  public getMessage() {
    return `Morning: ${this.morning.getMessage()}\nAfternoon: ${this.afternoon.getMessage()}\nEvening: ${this.evening.getMessage()}`;
  }
}
