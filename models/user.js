const constraints = (DataTypes) => ({
  displayName: {
    type: DataTypes.STRING,
    len: [8, 64],
  },
  email: {
    type: DataTypes.STRING,
    isEmail: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    len: [6, 6],
  },
  image: {
    type: DataTypes.STRING,
    isUrl: true,
  },
});

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    constraints(DataTypes),
    { timestamps: false },
  );

  return User;
};
