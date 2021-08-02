module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('BlogPosts',{
      id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:Sequelize.INTEGER,
      },
      title:{
        allowNull:false,
        type:Sequelize.STRING,
        field:'title',
      },
      content:{
        allowNull:false,
        type:Sequelize.STRING,
        field:'content',
      },
      userId:{
        allowNull:false,
        type:Sequelize.INTEGER,
        field:'userId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      published:{
        allowNull:false,
        type:Sequelize.STRING,
        field:'published',
      },
      updated:{
        allowNull:false,
        type:Sequelize.STRING,
        field:'updated',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
   
    return queryInterface.dropTable('PostsCategories');
  }
};
