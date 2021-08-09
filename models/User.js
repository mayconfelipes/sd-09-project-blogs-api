module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost,
      { foreignKey: 'userId', as: 'blogPost' });
  };

  return User;
};

// module.exports = (sequelize, DataTypes) => {
//   const UserStructure = sequelize.define('User', {
//     displayName: {
//       type: DataTypes.STRING,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: {
//           msg: "Este campo não pode ser vazio"
//         },
//       },
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: {
//           msg: "Este campo não pode ser vazio"
//         },
//         len: {
//           args: [6, 30],
//           msg: "Este campo deve tr entre 4 e 20 caracteres"
//         }
//       },
//     },
//     image: DataTypes.STRING,
//   }, {
//     timestamps: false,
//   });

//   return UserStructure;
// };