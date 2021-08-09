module.exports = (sequelize, _DataTypes) => {
 const PostsCategories = sequelize.define(
   'PostCategories', {}, { timestamps: false },
 ); 

 PostsCategories.associate = (models) => {
  models.Categories.belongsToMany(models.BlogPosts, {
    as: 'blogsposts',
    through: PostsCategories,
    foreignKey: 'productId',
    otherKey: 'selloffId',
  });

  models.Selloff.belongsToMany(models.Product, {
    as: 'products',
    through: SelloffProducts,
    foreignKey: 'selloffId',
    otherKey: 'productId',
  });
};
 return PostsCategories;
};