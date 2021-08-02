'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PostsCategories", {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "BlogPosts",
          key: "id"
        },
        primaryKey: true,
        onDelete: 'CASCADE',
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id"
        },
        primaryKey: true,
        onDelete: 'CASCADE',
      },
    });

    return postsCategories;
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("PostsCategories");
  }
};
