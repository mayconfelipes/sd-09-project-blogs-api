const validateName = {
  isLength: { min: 8, msg: '"displayName" length must be at least 8 characters long' },
};

const validateEmail = {
  isEmail: { msg: '"email" must be a valid email' },
  notNull: { msg: '"email" is required' },
};

const validatePassword = {
  notNull: { msg: '"password" is required' },
  len: { min: 6, msg: '"password" length must be 6 characters long' },
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    displayName: { type: DataTypes.STRING, allowNull: false, validate: validateName },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'User already registered' },
      validate: validateEmail,
    },
    password: { type: DataTypes.STRING, allowNull: false, validate: validatePassword },
    image: DataTypes.STRING,
  }, { timestamps: false, tableName: 'Users' });

  User.associate = (models) => {
    models.User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'posts' });
  };
  return User;
};
