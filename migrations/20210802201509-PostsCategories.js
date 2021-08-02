module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostsCategories',{
      postId:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:Sequelize.INTEGER,
      },
      categoryId:{
        allowNull:false,
        type:Sequelize.INTEGER,
        field:'categoryId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
   
    return queryInterface.dropTable('PostsCategories');
  }
};
