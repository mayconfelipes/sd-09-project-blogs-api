const User = (sequelize, DataTypes) => {
  const CurrUser = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Users',
    underscore: true,
  });

  return CurrUser;
};

module.exports = User;