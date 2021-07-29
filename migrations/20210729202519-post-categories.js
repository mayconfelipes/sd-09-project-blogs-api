'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postsCategories = queryInterface.createTable("PostsCategories", {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "BlogPosts",
          foreignKey: "id"
        },
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          foreignKey: "id"
        },
      },
    });

    return postsCategories;
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.dropTable("PostsCategories");
  }
};
