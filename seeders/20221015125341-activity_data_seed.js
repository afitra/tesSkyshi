'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     var  {faker}  = require( '@faker-js/faker');
      let  data =[]
      for (let i = 0; i < 100; i++) {
        // async let temp = {}
        await data.push({
          email: faker.internet.email(),
          title: faker.internet.userName(),
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null
        })
        
      }
     return queryInterface.bulkInsert(
      "Activities",
     data,
      {}
    );

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete(
      "Activities",
      { },
      {}
    );
  }
};
