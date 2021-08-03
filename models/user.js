module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Users',
    underscored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, 
      { foreignKey: 'user_id', as: 'posts' });
  };

  return User;
};