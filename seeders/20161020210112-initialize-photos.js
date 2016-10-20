'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Photos', [{
        title: 'honu',
        author: 'hawaiian islands',
        link: 'http://www2.padi.com/blog/wp-content/uploads/2016/01/160108-Philippines-Marine-Life-Sea-Turtle-650x400.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'endangered species',
        userId: 1
      },
      {
        title: 'kaanapali',
        author: 'hawaiian islands',
        link: 'http://kaanapaliresort.com/wp-content/uploads/2016/01/image001.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'deep blue',
        userId: 1
      },
      {
        title: 'finding nemo',
        author: 'marlin',
        link: 'http://www.livescience.com/images/i/000/084/748/original/ocellaris-clownfish.jpg?interpolation=lanczos-none&downsize=*:1000',
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'where he at?',
        userId: 2
      },
      {
        title: 'pufferfish',
        author: 'hawaiian islands',
        link: 'https://d18gmz9e98r8v5.cloudfront.net/ptr/20130523002001_1403111366_1192_9.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'puff puff',
        userId: 1
      },
      {
        title: 'humumu',
        author: 'nukunuku',
        link: 'http://www.statesymbolsusa.org/sites/statesymbolsusa.org/files/primary-images/HumuhumunukunukuapuaaHI.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'apua\'a',
        userId: 1
      },
      {
        title: 'honu two',
        author: 'hawaiian islands',
        link: 'http://i.dailymail.co.uk/i/pix/2016/04/18/15/334BFC7500000578-0-image-a-70_1460989467196.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'woo',
        userId: 1
      }], {});

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Photos', {
      author: [
        'hawaiian islands',
        'nukunuku',
        'marlin',
        'deep blue',
      ]
    }, {});

  }
};