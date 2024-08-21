import { Table, Model, Column, BelongsTo } from 'sequelize-typescript';
import { Subscriber } from './subscriber.entity';

//Anotaciones: uso de clase abstracta
@Table
export class ContactMethod extends Model {
  id?: number;

  @Column
  name: string;

  @BelongsTo(() => Subscriber, 'subscriberId')
  subscriber: Subscriber;

  public sendNotification(message: string) {
    console.log(`Notification sent: ${message}`);
  }
}
