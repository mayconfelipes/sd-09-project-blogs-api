module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
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