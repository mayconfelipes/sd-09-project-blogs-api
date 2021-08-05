module.exports = (sequelize, DataTypes) => {
  const PostStructure = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    timestamps: false,
  });

  return PostStructure;
};
