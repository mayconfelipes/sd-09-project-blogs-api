const Categorie = (sequelize, DataTypes) => {
  const CategorieModel = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return CategorieModel;
};

module.exports = Categorie;