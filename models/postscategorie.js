module.exports = (sequelize, DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie', {}, { timestamps: false })

  PostCategorie.associate = (models) => {
    PostCategorie.BelongsToMany(models.Categorie, { as: 'PostCategorie', foreingKey: 'BelongsToMany' });
  };

  PostCategorie.associate = (models) => {
    PostCategorie.BelongsToMany(models.BlogPost, { as: 'PostCategorie', foreingKey: 'BelongsToMany' });
  };

  return PostCategorie;
}