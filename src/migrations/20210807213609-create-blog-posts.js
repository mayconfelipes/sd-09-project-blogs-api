module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING },
      content: { type: Sequelize.STRING },
      userId: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
        references: { model: 'Users', key: 'id' },
      },
      published: { type: Sequelize.DATE },
      updated: { type: Sequelize.DATE },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: new Date(), field: 'created_at' },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: new Date(), field: 'updated_at' },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  },
};