const createCategory = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return Categories;
};

module.exports = createCategory;
/* este codigo foi desenvolvido com a trica de 9 16 : Joao Vitor, Joao Pedro e ANtonio arieiro && WARROM*/