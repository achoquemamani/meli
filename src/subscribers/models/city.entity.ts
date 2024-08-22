import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model } from 'sequelize-typescript';
import { Period } from '../../notifications/models/wave.forecast';

@Table
export class City extends Model {
  id?: number;

  @ApiProperty()
  @Column
  externalId: number;

  @ApiProperty()
  @Column
  name: string;

  public isCoastal(period: Period) {
    return period.day !== '00/00/0000 00:00:00';
  }
}
