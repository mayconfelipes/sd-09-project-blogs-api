'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsCategoriesTable = await queryInterface.createTable('PostsCategories', {
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: 'Categories', key: 'id' },
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      postId: {
        type: Sequelize.INTEGER,
        references: { model: 'BlogPosts', key: 'id' },
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    });

    return PostsCategoriesTable;
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  }
}; 