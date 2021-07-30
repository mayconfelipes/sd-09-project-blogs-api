'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostsCategories', {
      
      BlogPostId: {
        type: Sequelize.INTEGER,
        references: { model:'BlogPosts', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primarykey: true,
        
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model:'Categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primarykey: true,
      },
       
    }, { timestamps: false });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  }
};