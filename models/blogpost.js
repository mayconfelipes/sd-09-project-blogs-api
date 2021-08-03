module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  }, { timestamps: false, tableName: 'BlogPosts' });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  
  return BlogPost;
};
