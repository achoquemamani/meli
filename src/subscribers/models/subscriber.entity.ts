import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { City } from './city.entity';
import { ContactMethod } from './contactMethod';

@Table
export class Subscriber extends Model {
  id?: number;

  contactMethods: ContactMethod[];

  @ApiProperty()
  @Column
  fullname: string;

  @ForeignKey(() => City)
  @Column
  cityId: number;

  @BelongsTo(() => City)
  city: City;

  @ApiProperty()
  @Column
  isEnabled: boolean;
}
