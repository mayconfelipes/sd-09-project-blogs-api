const defineUserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
  displayName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  image: DataTypes.STRING,
  }, { timestamps: false });
  
  User.associate = (models) => {
    User.hasMany(models.BlogPost, { as: 'blogposts', foreignKey: 'userId' });
  };

  return User;
};

module.exports = defineUserModel;