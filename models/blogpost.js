module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, { timestamps: false });
  // tive que adicionar o campo de timestamps false pois
  // havia entendido errado o que significava. Após buscar
  // na internet entendi que era pra não precisar passar
  // valores para os campos na criação de um novo post

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Users,
      { as: 'user', foreignKey: 'userId' });
    };

  // BlogPost.associate = (models) => {
  //   BlogPost.hasOne(models.Category, 
  //     { as: 'category', foreignKey: 'categoryId' });
  // };
  return BlogPost;
};