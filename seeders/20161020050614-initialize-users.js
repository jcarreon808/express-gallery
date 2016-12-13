'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: function (queryInterface, Sequelize) {
    let joeHash = bcrypt.hashSync('tacocat');
    let rayHash = bcrypt.hashSync('ilovepugs');

    return queryInterface.bulkInsert('Users', [{
      username: 'joejoebinks',
      password: joeHash,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'braddahrayray',
      password: rayHash,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};