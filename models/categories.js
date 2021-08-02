module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
      name: { allowNull: false, type: DataTypes.STRING },
    },
    {
      timestamps: false,
    });

  return Categorie;
};
