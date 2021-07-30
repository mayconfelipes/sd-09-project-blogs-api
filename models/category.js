module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, { timestamps: false });

  Category.associate = (models) => {
    Category.belongsTo(models.Post, { as: 'post', foreignKey: 'id' });
  };

  return Category;
};