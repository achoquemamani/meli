import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { City } from './city.entity';
import { ContactMethod } from './contactMethod';

@Table
export class Subscriber extends Model {
  id?: number;

  @HasMany(() => ContactMethod, 'subscriberId')
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

  public sendNotifications(message: string) {
    this.contactMethods.forEach((contactMethod) => {
      contactMethod.sendNotification(message);
    });
  }

  public closeAccount(phrase: string) {
    this.isEnabled = false;
  }
}
