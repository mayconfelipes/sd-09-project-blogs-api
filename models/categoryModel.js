module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  // Category.associate = (models) => {
  //   Category.belongsToMany(models.BlogPosts, {
  //     as: 'blog',
  //     through: 'PostCategories',
  //   });
  // };

  return Category;
};
