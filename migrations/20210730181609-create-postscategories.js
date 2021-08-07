'use strict';

// postId(referencia table blogposts), categoryId(referencia table categories)
// {
//   "postId": 50,
//   "categoryId": 20
// }

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostsCategories', {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
      { timestamps: false });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  }
};
