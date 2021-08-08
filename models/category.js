module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
    underscored: false,
  });
  Category.associate = (models) => {
    Category.hasMany(models.PostCategory,
      { foreignKey: 'category_id', as: 'users' });
  };
  return Category;
};