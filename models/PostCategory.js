module.exports = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategories', {
    postId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
    {
      timestamps: false,
      tableName: 'PostsCategories',
    });

  PostsCategory.associate = (models) => {
    PostsCategory.hasOne(models.Address,
      { foreignKey: 'employee_id', as: 'addresses' });
  };
  return PostsCategory;
};