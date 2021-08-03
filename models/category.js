module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
    underscored: true,
  });
  Category.associate = (models) => {
    Category.hasMany(models.PostCategory,
      { foreignKey: 'category_id', as: 'users' });
  };
  return Category;
};