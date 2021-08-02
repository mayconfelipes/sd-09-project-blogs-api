const BlogPost = (sequelize, DataTypes) => {
  const CurrPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    content: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
    // underscore: true,
  });

  CurrPost.associate = (models) => {
    CurrPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return CurrPost;
};

module.exports = BlogPost;