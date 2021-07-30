const User = (sequelize, DataTypes) => {
  const newUser = sequelize.define('User',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    { timestamps: false });

    newUser.associate = (models) => {
      newUser.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'blogPosts',
    });
  };

  return newUser;
};

module.exports = User;
