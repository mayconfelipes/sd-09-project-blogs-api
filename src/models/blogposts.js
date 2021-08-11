const BlogPosts = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'BlogPosts',
    {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    },
    { createdAt: 'published', updatedAt: 'updated' },
  );
  model.associate = (models) => {
    model.belongsTo(
      models.Users,
      { foreignKey: 'userId', as: 'user' },
    );
  };

  return model;
};

module.export = BlogPosts;
