'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostsCategories', {
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

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('PostsCategories')
  }
};
