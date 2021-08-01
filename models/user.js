module.exports = (sequelize, DataTypes) => sequelize.define('User', {
    displayName: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
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
