const Category = (sequelize, DataTypes) => {
  const CategoryModel = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  CategoryModel.associate = (models) => {
    CategoryModel.hasMany(models.PostCategory, {
      foreignKey: 'categoryId',
    });
  };
  return CategoryModel;
};
module.exports = Category;
