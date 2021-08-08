module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'Categories',
    });

  Category.associate = (models) => {
    Category.hasaMany(models.Post,
      {
        foreignKey: 'postId', as: 'posts',
      });
  };
  return Category;
};