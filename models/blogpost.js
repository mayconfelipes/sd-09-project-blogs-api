const BlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define(
    'BlogPosts',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      content: DataTypes.STRING,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    { tableName: 'BlogPosts', timestamps: false },
  );

  BlogPosts.associate = (model) => {
    BlogPosts.belongsTo(model.User, { foreignKey: 'userId', as: 'user' });
  };

  return BlogPosts;
};

module.exports = BlogPost;