module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });
  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts, { as: 'user', foreignKey: 'userId' });
  };
  return Users;
};
