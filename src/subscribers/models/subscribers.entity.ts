import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  id?: number;

  @ApiProperty()
  @Column
  username: string;

  @ApiProperty()
  @Column
  password: string;
}
