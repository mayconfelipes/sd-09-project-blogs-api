module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGRER,
    },
    displayName: { allowNull: false, type: Sequelize.STRING },
    email: { allowNull: false, type: Sequelize.STRING, unique: 'unique_tag' },
    password: { allowNull: false, type: Sequelize.STRING },
    image: { allowNull: false, type: Sequelize.STRING },
  },
  { // https://stackoverflow.com/questions/42195348/
    uniqueKeys: {
      unique_tag: {
        customIndex: true,
        fields: ['email'],
      },
    },
  });
},
down: async (queryInterface, _Sequelize) => {
  await queryInterface.dropTable('Users');
},
}; 
