'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _) {
    const cities = await queryInterface.bulkInsert(
      'Cities',
      [
        {
          name: 'São Benedito do Sul',
          externalId: 4752,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'São Bento do Norte',
          externalId: 4757,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true },
    );
    const subscribers = await queryInterface.bulkInsert(
      'Subscribers',
      [
        {
          fullname: 'Ariel Choque',
          cityId: cities[0].id,
          isEnabled: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullname: 'Jose Pepe',
          cityId: cities[1].id,
          isEnabled: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullname: 'Jose Pepe v2',
          cityId: cities[1].id,
          isEnabled: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true },
    );
    await queryInterface.bulkInsert(
      'ContactMethods',
      [
        {
          type: 'Web',
          subscriberId: subscribers[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Web',
          subscriberId: subscribers[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, _) {
    await queryInterface.bulkDelete('Subscribers', null, {});
    await queryInterface.bulkDelete('Cities', null, {});
  },
};
