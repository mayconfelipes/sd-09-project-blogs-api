'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   const categories = queryInterface.createTable("Categories", {
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
   });

   return categories;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("Categories");
  }
};
