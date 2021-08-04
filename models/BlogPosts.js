module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    published: { type: DataTypes.DATE, defaultValue: Date.now() },
    updated: { type: DataTypes.DATE, defaultValue: Date.now() },
  },
  {
    timestamps: false,
    tableName: 'BlogPosts',
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
    BlogPosts.hasMany(models.Categories,
      { foreignKey: 'id', as: 'categories' });
  };
  return BlogPosts;
};

// refatoração realizada após o estudo do pull requeste:
//  https://github.com/tryber/sd-09-project-blogs-api/pulls/34
