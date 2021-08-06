module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
      id: { allowNull: false, type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      userId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'BlogPosts',
    });

    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

  return BlogPost;
};