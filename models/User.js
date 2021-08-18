const User = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, { timestamps: false });

  return UserModel;
};

module.exports = User;
