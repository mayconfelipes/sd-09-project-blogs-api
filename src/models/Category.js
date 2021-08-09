const Category = (sequelize, DataTypes) => sequelize.define('Category', {
  name: DataTypes.STRING,
}, {
  tableName: 'Categories',
  timestamps: false,
});

module.exports = Category;
