module.exports = (sequelize, DataTypes) => {
  const categorie = sequelize.define('Categories', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  });
  
  return categorie;
};