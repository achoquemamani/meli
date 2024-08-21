'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'achoque',
          password: 'qwerty1234',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'admin',
          password: 'qwerty1234',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
