const Categories = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categories', {
    name: DataTypes.STRING,
  }, { timestamps: false });

  return Categorie;
};

module.exports = Categories; 