'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _) {
    const cities = await queryInterface.bulkInsert(
      'Cities',
      [
        {
          name: 'Rio de Janeiro',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true },
    );
    const cityId = cities[0].id;
    const subscribers = await queryInterface.bulkInsert(
      'Subscribers',
      [
        {
          fullname: 'Ariel Choque',
          cityId: cityId,
          isEnabled: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullname: 'Jose Pepe',
          cityId: cityId,
          isEnabled: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true },
    );
    const subscriberId = subscribers[0].id;
    await queryInterface.bulkInsert(
      'ContactMethods',
      [
        {
          name: 'Web',
          subscriberId: subscriberId,
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
