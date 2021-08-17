const validateTitle = {
  notNull: { msg: '"title" is required' },
};

const validateContent = {
  notNull: { msg: '"content" is required' },
};

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false, validate: validateTitle },
    content: { type: DataTypes.STRING, allowNull: false, validate: validateContent },
    userId: { type: DataTypes.INTEGER, field: 'userId' },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { createdAt: 'published', updatedAt: 'updated' });

  BlogPost.associate = (models) => {
    models.BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};
  return BlogPost;
};
