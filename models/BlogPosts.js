module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    createdAt: { field: 'published' },
    updatedAt: { field: 'updated' },
  },
  {
    timestamps: false,
    tableName: 'BlogPosts',
  });

  BlogPosts.associate = (models) => {
    BlogPosts.hasMany(models.Users,
      { foreignKey: 'id', as: 'users' });
  };

  return BlogPosts;
};
