
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostsCategories', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'blogPosts', // nome da tabela
          key: 'id'
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'categories',
          key: 'id'
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  }
};
