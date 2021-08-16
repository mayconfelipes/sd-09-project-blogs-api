const fieldsUsers = (params) => ({
  id: { type: params.INTEGER, primaryKey: true, autoIncrement: true },
  displayName: params.STRING,
  email: params.STRING,
  password: params.STRING,
  image: params.STRING,
});

const configUsers = () => ({
  timestamps: false,
  tableName: 'Users',
});

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', fieldsUsers(DataTypes), configUsers());

  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Users;
};
