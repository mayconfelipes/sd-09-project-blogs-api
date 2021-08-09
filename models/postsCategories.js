module.exports = (sequelize, DataTypes) => {
 const PostsCategories = sequelize.define(
   'PostCategories',
   {},
   { timestamps: false },
 ); 

 return PostsCategories;
};