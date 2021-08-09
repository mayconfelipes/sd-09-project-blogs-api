const BlogPost = (sequelize, DataTypes) => {
  const blogpost = sequelize.define(
    'BlogPost',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: { type: DataTypes.DATE, defaultValue: new Date() },
      updated: { type: DataTypes.DATE, defaultValue: new Date() },
    },
    {
      timestamps: false,
    },
  );

  blogpost.associate = (models) => {
    blogpost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return blogpost;
};

module.exports = BlogPost;
