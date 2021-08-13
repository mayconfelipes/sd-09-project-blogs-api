module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // model sempre no singular
      displayName: DataTypes.STRING,
      email: DataTypes.STRING, // tem quer ser único
      password: DataTypes.STRING,
      image: DataTypes.STRING,
  },
  {
    timestamps: false,
  }); 

  /* N */
  User.associate = (models) => {
    User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'user' });
  };

  return User;
};
