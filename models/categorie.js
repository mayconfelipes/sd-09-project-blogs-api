module.exports = (sequelize, DataTypes) => {
 const Categorie = sequelize.define('Categories', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
 });
 
  return Categorie;
};