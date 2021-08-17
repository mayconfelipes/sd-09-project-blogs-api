module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '"name" is required' },
      },
    },
  }, { timestamps: false, tableName: 'Categories' });

  return Category;
};
