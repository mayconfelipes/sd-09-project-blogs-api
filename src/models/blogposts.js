module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    }, { timestamps: false,
    });
    BlogPost.associate = (models) => {
 BlogPost.belongsTo(models.User,
       { foreignKey: 'userId', as: 'users' });
    };
// as é um apelido da representação
  return BlogPost;
};
