'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'user_id'
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'display_name',
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'email',
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'password',
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'image',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
