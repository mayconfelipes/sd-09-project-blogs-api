module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: new Date(), field: 'create_at' },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: new Date(), field: 'update_at' },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Categories');
  },
};