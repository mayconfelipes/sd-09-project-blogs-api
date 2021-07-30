module.exports = (sequelize, DataTypes) => {
    const PostCategories = sequelize.define('PostCategories', {
      postId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      categoryId: DataTypes.INTEGER,
    },
    {
      timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
      tableName: 'PostCategories',
    });
  
    PostCategories.associate = (models) => {
        PostCategories.belongsTo(models.Categories,
        { foreignKey: 'categoryId', as: 'Categories' });
    };
  
    return PostCategories;
  };