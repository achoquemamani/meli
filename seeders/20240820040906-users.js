'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _) {
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash('qwerty1234', salt);
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'achoque',
          password: hashedPassword,
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'admin',
          password: hashedPassword,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, _) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
