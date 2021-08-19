'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPosts = queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'published',
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated',
        allowNull: false,
        defaultValue: new Date(),
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('BlogPosts');
  }
};
