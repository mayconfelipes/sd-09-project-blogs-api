module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Users',
  });
  User.associate = (models) => {
    User.hasOne(models.BlogPosts,
      { foreignKey: 'user_id', as: 'blogposts' });
  };

  return User;
};
