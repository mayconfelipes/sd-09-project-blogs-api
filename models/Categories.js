const Categorie = (sequelize, DataTypes) => {
  const CategorieModel = sequelize.define('Categories', {
    name: DataTypes.STRING,
  }, { timestamps: false });

  return CategorieModel;
};

module.exports = Categorie;
