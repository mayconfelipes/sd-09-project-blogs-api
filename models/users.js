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
      displayName: DataTypes.STRING,
      email: DataTypes.STRING, // tem quer ser único
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    });

    User.associate = (models) => {
      User.hasMany(models.BlogPost,
        { foreingKey: 'userId', as: 'postUser' });
    };

  return User;
};
