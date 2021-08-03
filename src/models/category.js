module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
  }, 
  { timestamps: false });
  
  Categories.associate = (models) => {
    Categories.hasOne(models.PostCategories, { 
      foreignKey: 'categoryId', as: 'post', 
    });
  };

  return Categories;
};