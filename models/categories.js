const Category = (sequelize, DataTypes) => {
  const defineCategory = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return defineCategory;
};

module.exports = Category;