module.exports = (sequelize, DataTypes) => sequelize.define('User', {
    displayName: {
      type: DataTypes.STRING,
      len: [8, 64],
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      len: [6, 6],
    },
    image: {
      type: DataTypes.STRING,
      isUrl: true,
    },
  });
