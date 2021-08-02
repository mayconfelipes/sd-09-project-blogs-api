const Post = (sequelize, DataTypes) => {
  const CurrPost = sequelize.define('Post', {
    title: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    content: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Posts',
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

module.exports = Post;