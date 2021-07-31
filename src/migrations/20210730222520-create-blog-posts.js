'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      published: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updated: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      userId: {
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('BlogPosts')
  },
};
