const user = (sequelize, DataTypes) => (
  sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  })
);

module.exports = user;
