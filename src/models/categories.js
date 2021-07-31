const Categorie = (sequelize, DataTypes) => {
  const CurrCategory = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Categories',
    // underscore: true,
  });

  return CurrCategory;
};

module.exports = Categorie;