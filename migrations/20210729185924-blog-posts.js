'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const blogPosts = queryInterface.createTable("BlogPosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "",
          foreignKey: ""
        },
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    return blogPosts;
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.dropTable("BlogPosts");
  }
};
