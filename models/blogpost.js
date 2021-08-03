module.exports = (sequelize, DataTypes) => {
  const blogpost = sequelize.define('blogpost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'blogpost',
  });
  return blogpost;
}; 