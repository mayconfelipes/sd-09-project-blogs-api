'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};