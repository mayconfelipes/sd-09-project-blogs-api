module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
    // tableName: 'Users',
  });

  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts,
      { foreignKey: 'id', as: 'blogposts' });
  };

  return Users;
};