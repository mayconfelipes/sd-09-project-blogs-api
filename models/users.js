// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Users extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Users.hasMany(models.BlogPosts);
//     }
//   }
//   Users.init({
//     displayName: DataTypes.STRING,
//     email: DataTypes.STRING, // tem quer ser único
//     password: DataTypes.STRING,
//     image: DataTypes.STRING,
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   }, {
//     sequelize,
//     modelName: 'Users',
//   });
//   return Users;
// };

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      id: { allowNull: false, type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      displayName: { type: DataTypes.STRING, validate: { len: [8] } },
      email: {
        allowNull: false, type: DataTypes.STRING, unique: true, validate: { isEmail: true } }, // tem quer ser único
      password: { allowNull: false, type: DataTypes.STRING, validate: { len: [6] } },
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'Users',
    });

    User.associate = (models) => {
      User.hasMany(models.BlogPost,
        { foreignKey: 'userId', as: 'postUser' });
    };

  return User;
};
