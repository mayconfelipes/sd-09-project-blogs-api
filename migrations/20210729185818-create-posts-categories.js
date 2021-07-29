'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postsCategories = queryInterface.createTable("PostsCategories", {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "",
          foreignKey: ""
        },
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "",
          foreignKey: ""
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {

  }
};
