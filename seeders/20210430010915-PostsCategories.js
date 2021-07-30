module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('PostsCategories',
      [
        {
          BlogPostId: 1,
          categoryId: 1,
        },
        {
          BlogPostId: 2,
          categoryId: 2,
        },

      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('PostsCategories', null, {});
  },
};
