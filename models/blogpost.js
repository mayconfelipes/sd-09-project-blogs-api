const constraints = (DataTypes) => ({
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    foreingKey: true,
  },
});

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    constraints(DataTypes),
    {
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
    },
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(
      models.User,
      { foreignKey: 'userId', as: 'user' },
    );
  };

  return BlogPost;
};