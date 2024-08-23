import { Table, Model, Column, BelongsTo } from 'sequelize-typescript';
import { Subscriber } from './subscriber.entity';

//Anotations: uso de clase abstracta
abstract class ContactMethodv2 {
  id: number;
  name: string;

  abstract sendNotification(): void;
}

class Web extends ContactMethodv2 {
  public sendNotification() {
    console.log('This notification is sent by web');
  }
}
//

@Table
export class ContactMethod extends Model {
  id?: number;

  @Column
  type: string;

  @BelongsTo(() => Subscriber, 'subscriberId')
  subscriber: Subscriber;

  public sendNotification(message: string) {
    console.log(`Notification sent: ${message}`);
  }
}
