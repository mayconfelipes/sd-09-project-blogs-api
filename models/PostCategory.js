module.exports = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
  },
    {
      timestamps: false,
      tableName: 'PostsCategories',
    });

  // PostsCategory.associate = (models) => {
  //   PostsCategory.hasOne(models.Address,
  //     { foreignKey: 'employee_id', as: 'addresses' });
  // };
  return PostsCategory;
};