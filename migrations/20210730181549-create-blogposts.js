'use strict';

// id, title, content, userId(referencia table users), mudar createdAt para published e updatedAt para updated

// {
//   "id": 21,
//   "title": "Latest updates, August 1st",
//   "content": "The whole text for the blog post goes here in this key",
//   "userId": 14, // esse é o id que referência usuário que é o autor do post
//   "published": "2011-08-01T19:58:00.000Z",
//   "updated": "2011-08-01T19:58:51.947Z",
// }

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'published',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated',
      },
    },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};
