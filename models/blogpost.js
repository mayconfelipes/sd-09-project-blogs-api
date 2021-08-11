module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: DataTypes.STRING,
    title: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  { timestamps: false,
    tableName: 'BlogPosts',
  });
  BlogPosts.associate = (models) => {
    models.BlogPosts.belongsTo(models.User, {
      as: 'user', // o nome que eu renomeio aqui é o que devo chamar no service getAll, dentro do Includes
      foreignKey: 'userId',
      // through: BlogPosts, // só eh utilizado no N to N
      // otherKey: 'userId', // só eh utilizado no N to N
    });
  };
  return BlogPosts;
};
