'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Categories = queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      name: {
        type: Sequelize.STRING,
      }
    });

    return Categories;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('Categories');
  }
};
