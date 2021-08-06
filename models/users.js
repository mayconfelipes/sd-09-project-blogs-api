const User = (sequelize, DataTypes) => {
  const users = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });
  // users.associate = (models) => {
  //   users.hasMany(models.BlogPosts, {
  //     foreignKey: 'userId', as: 'BlogPosts',
  //   });
  // };

  return users;
};

  module.exports = User;
// https://sequelize.org/master/manual/validations-and-constraints.html
// https://www.youtube.com/watch?v=3RzW3IqtGR0