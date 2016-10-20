'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'joejoebinks',
      password: 'tacocat',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'braddahrayray',
      password: 'ilovepugs',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
