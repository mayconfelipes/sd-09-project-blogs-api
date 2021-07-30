// const { blogPost } = require('./index');

const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    displayName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  }, { timestamps: false });
User.associate = (models) => {
  User.hasMany(models.BlogPosts, { as: 'user', foreignkey: 'id' });
};  

  return user;
};

module.exports = User;