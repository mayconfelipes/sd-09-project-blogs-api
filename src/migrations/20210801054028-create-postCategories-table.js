'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostCategories', {
      postId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'BlogPosts',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      categoryId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PostCategories')
  }
};
