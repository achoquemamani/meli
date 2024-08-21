import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class City extends Model {
  id?: number;

  @ApiProperty()
  @Column
  externalId: number;

  @ApiProperty()
  @Column
  name: string;

  public isCoastal() {
    //TODO
    return true;
  }
}
