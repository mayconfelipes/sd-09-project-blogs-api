module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.bulkInsert(
      'BlogPosts',
      [
        {
          id: 1,
          title: 'Post do Ano',
          content: 'Melhor post do ano',
          user_id: 1,
          published: '2011-08-01T19:58:00.000Z',
          updated: '2011-08-01T19:58:51.000Z',
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          id: 2,
          title: 'Vamos que vamos',
          content: 'Foguete não tem ré',
          user_id: 1,
          published: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated: Sequelize.literal('CURRENT_TIMESTAMP'),
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ],
      {}
    ),

  down: async (queryInterface, _Sequelize) =>
    await queryInterface.bulkDelete('BlogPosts', null, {}),
};
