import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/models/user.entity';
import { City } from '../subscribers/models/city.entity';
import { Subscriber } from '../subscribers/models/subscriber.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });
      sequelize.addModels([User, City, Subscriber]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
