module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
  });

  Category.associate = (models) => {
    Category.hasMany(models.BlogPost, { through: models.PostCategory });
  };

  return Category;
};
