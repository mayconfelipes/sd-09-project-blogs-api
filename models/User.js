module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { timestamps: false });

  User.associate = (mod) => {
    User.hasMany(mod.BlogPost,
      { foreignKey: 'userId', as: 'blogposts' });
  };
  
  return User;
};
