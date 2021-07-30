module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define('Categories', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
    },
    {
      timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
      tableName: 'Categories',
    });
  
    Categories.associate = (models) => {
        Categories.hasOne(models.PostCategories,
        { foreignKey: 'categoryId', as: 'PostCategories' });
    };
  
    return Categories;
  };