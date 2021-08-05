module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
      id: { allowNull: false, type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { allowNull: false, type: DataTypes.STRING },
    },
    {
      timestamps: false,
      talbeName: 'Categories',
    });

  return Categorie;
};
