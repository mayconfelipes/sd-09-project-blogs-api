module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
  }, 
  { timestamps: false },
  { tableName: 'Categories' });
  
  Categories.associate = (models) => {
    Categories.hasOne(models.PostCategories, { 
      foreignKey: 'categoryId', as: 'post', 
    });
  };

  return Categories;
};