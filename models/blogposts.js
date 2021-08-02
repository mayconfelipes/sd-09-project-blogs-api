module.exports = (sequelize, DataTypes) => {
  const PostStructure = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return PostStructure;
};
