'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('BlogPosts', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      onUpdate: "CASCADE",
      onDelete:"CASCADE",
      references: { model: 'Users', foreignkey: 'id'  }
    })
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('BlogPosts', 'userId');
  }
};
