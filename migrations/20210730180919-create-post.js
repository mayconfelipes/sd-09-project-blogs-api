module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // Utlizado o Sequelize.fn('now') para corrigir o erro das datas estarem,
      // retornando erro de default value
      // resolução achada no link abaixo:
      // https://stackoverflow.com/questions/40694689/set-defaultvalue-to-todays-date-in-a-sequelize-migration
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'published',
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated',
        defaultValue: Sequelize.fn('now')
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};
