module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  }, { timestamps: false, tableName: 'BlogPosts' });

  Post.associate = (models) => {
    Post.hasMany(models.Category, { as: 'category', foreignKey: 'id' });
  };

  return Post;
};