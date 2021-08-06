// 'use strict';
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('BlogPosts', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       title: {
//         allowNull: false,
//         type: Sequelize.STRING
//       },
//       content: {
//         allowNull: false,
//         type: Sequelize.STRING
//       },
//       userId: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         onDelete: 'CASCADE',
//         field: 'userId',
//         references: {
//           model: 'Users',
//           key: 'id',
//         },
//       },
//       // createAt: {
//       //   allowNull: false,
//       //   type: Sequelize.DATE,
//       // },
//       // updateAt: {
//       //   allowNull: false,
//       //   type: Sequelize.DATE,
//       // },
//     });
//   },
//   down: async (queryInterface, Sequelize) => {
//     return queryInterface.dropTable('BlogPosts');
//   }
// };