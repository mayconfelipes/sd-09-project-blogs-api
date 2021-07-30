const Categories = (sequelize, DataTypes) => {
  const categories = sequelize.define('Categories', {
    id: { 
      type: DataTypes.INTEGER,
      AllowNull: false,
      primaryKey: true,
    },  
    name: {
      type: DataTypes.STRING, 
    },
   
  }, { timestamps: false });
   Categories.associate = (models) => {
    Categories.belongsToMany(models.BlogPosts, {
      as: 'categories',
      through: 'PostsCategories',
      foreignkey: 'postId', 
    });
  };
 
  return categories;
};

module.exports = Categories;
