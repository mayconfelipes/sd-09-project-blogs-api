const User = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Users',
  });
  UserModel.associate = (models) => {
    UserModel.hasMany(models.BlogPost, {
      foreignkey: 'userId',
    });
  };
  return UserModel;
};
module.exports = User;