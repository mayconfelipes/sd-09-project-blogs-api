const Categories = (sequelize, DataTypes) => (
  sequelize.define('Categories', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  })
);

module.exports = Categories;
