'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'id',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'name',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Categories');
  }
};
