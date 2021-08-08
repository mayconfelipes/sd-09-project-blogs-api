const User = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    { tableName: 'Users', timestamps: false },
  );
  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts, { foreignKey: 'userId', as: 'blogposts' });
  };
  return Users;
};

module.exports = User;