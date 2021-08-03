'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostsCategories', {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'postId',
        references: {
          model: 'BlogPosts',
          foreignKey: 'id',
        }
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'categoryId',
        references: {
          model: 'Categories',
          foreignKey: 'id',
        }
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  }
};