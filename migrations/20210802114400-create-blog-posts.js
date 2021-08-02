'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('BlogPosts', {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'post_id',
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
        field: 'user_id',
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
