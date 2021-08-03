'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPostsTable = await queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING,
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });

    return BlogPostsTable;
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
}; 