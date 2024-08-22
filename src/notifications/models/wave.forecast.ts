interface Period {
  day: string;
  agitacao: string;
  altura: number;
  direcao: string;
  vento: number;
  vento_dir: string;
}

export interface WaveForecast {
  morning: Period;
  afternoon: Period;
  evening: Period;
}
