'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // await queryInterface.bulkInsert('users',
    //   [
    //     {
    //       first_name: 'Doesd',
    //       last_name: 'Doe',
    //       email: 'm23@m.com',
    //       passw_hash: '1234',
    //       birthday: '2020-10-20',
    //       gender: 'male',
    //       created_at: new Date().toISOString(),
    //       updated_at: new Date().toISOString()
    //     },
    //     {
    //       first_name: 'Doe test',
    //       last_name: 'Doe test',
    //       email: 'm@m22.com',
    //       passw_hash: '1234',
    //       birthday: '2020-11-21',
    //       gender: 'male',
    //       created_at: new Date().toISOString(),
    //       updated_at: new Date().toISOString()
    //     }
    //   ], {});

  },

  async down(queryInterface, Sequelize) {

   // await queryInterface.bulkDelete('users', null, {});

  }
};
