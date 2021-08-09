const User = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
      updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
    },
    {
      timestamps: false,
    },
  );

  user.associate = (models) => {
    user.hasMany(models.BlogPosts, { as: 'BlogPosts', foreignKey: 'userId' });
  };

  return user;
};

module.exports = User;
