const Categorie = (sequelize, DataTypes) => {
  const createCategorie = sequelize.define('Categorie', {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
    });

  return createCategorie;
};

module.exports = Categorie;