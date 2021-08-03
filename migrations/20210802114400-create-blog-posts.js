'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'id',
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'title',
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'content',
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'userId',
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'published',
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BlogPosts');
  }
};
