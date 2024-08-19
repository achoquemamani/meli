import { Sequelize } from 'sequelize-typescript';
import { Loan } from '../loan/loan.entity';
import { User } from '../users/user.entity';

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
      sequelize.addModels([Loan]);
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
