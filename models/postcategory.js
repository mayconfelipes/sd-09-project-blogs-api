module.exports = (sequelize, DataTypes) => {
  const postcategory = sequelize.define('postcategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    categoryId: DataTypes.INTEGER,
  },
  { timestamps: false },
  {
    sequelize,
    modelName: 'postcategory',
  });
  return postcategory;
}; 