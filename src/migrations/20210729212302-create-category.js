module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGRER,
      },
      name: {
        allowNull: false,
        type: Sequelize.INTEGRER,
      },

    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Categories');
  },
};
