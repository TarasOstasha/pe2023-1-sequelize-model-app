'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tasks',
      [
        {
          body: 'To do hw',
          deadline: '2024-02-01',
          user_id: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: 'Walk',
          deadline: '2024-02-01',
          user_id: 19,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: 'To do hw',
          deadline: '2024-02-01',
          user_id: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};