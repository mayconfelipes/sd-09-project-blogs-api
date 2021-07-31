module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING, // tem quer ser único
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    });

    User.associate = (models) => {
      User.hasOne(models.BlogPost,
        { foreingKey: 'userId', as: 'BlogPost' });
    };

  return User;
};
