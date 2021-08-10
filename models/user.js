module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { timestamps: false,
    tableName: 'Users', // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
  // }, {sequelize,modelName: 'user'},
  });
  User.associate = (models) => {
    User.hasMany(models.BlogPosts, {
      as: 'BlogPosts',
      foreignKey: 'userId',
    });
  };
  return User;
};
