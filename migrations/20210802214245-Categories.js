'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const CategorieTable = queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    })

  return CategorieTable;
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.destroyTable('Categories')
  }
};
