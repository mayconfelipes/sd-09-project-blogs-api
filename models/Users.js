module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.INTEGER },
    image: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  });

  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts, { foreignKey: 'userId', as: 'user' });
  };
  return Users;
};
