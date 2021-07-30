module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Categories',
  { name: DataTypes.STRING },
  { timestamps: false });

  // Category.associate = (models) => {
  //   Category.belongsTo(models.PostCategory,
  //     { as: 'category', foreignKey: 'Id' });
  // };

  // Category.associate = (models) => {
  //   Category.belongsToMany(models.BlogPost,
  //     { as: 'user', foreignKey: 'userId' });
  // };

  return Category;
};