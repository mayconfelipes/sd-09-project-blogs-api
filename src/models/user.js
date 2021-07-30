module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
   { timestamps: false },
   { tableName: 'Users' });

  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts, {
      foreignKey: 'userId', as: 'blogpost',
    });
  };

  return Users;
};