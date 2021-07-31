module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts',
  {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });
  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users, { foreignKey: 'id', as: 'user_Id' });
  };

  return BlogPosts;
};
