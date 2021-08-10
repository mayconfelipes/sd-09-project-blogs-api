module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: DataTypes.STRING,
    title: DataTypes.STRING,
  },
  { timestamps: false,
    tableName: 'BlogPosts',
  });
  BlogPosts.associate = (models) => {
    models.BlogPosts.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'userId',
      // through: BlogPosts, // só eh utilizado no N to N
      // otherKey: 'userId', // só eh utilizado no N to N
    });
  };
  return BlogPosts;
};
