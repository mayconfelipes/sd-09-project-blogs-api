const stateCreated = 201;
const stateBadRequest = 400;

const replyTitle = (answer) => {
  if (answer === 'Field \'title\' doesn\'t have a default value') {
    return { code: stateBadRequest, phrase: '"title" is required' };
  }
};

const replyContent = (answer) => {
  if (answer === 'Field \'content\' doesn\'t have a default value') {
    return { code: stateBadRequest, phrase: '"content" is required' };
  }
};
// const replyCategoryIds = (answer) => {
//   if (answer === '') {
//     return { code: stateBadRequest, phrase: '"categoryId" is required'}
//   }

//   // if (answer === '') {   
//   //   return { code: stateBadRequest, phrase: '"categoryId" is required'}
//   // }   aguardando  tabela de ids
// }

const createBlogpostError = (answer) => {
  const titleError = replyTitle(answer);
  if (titleError) return titleError;

  const contentError = replyContent(answer);
  if (contentError) return contentError;

  // const categoryIdsError = replyCategoryIds(answer);
  // if (categoryIdsError) return categoryIdsError;
};

const createBlogpostOk = ({ id, userId, title, content }) => {
  const blogpost = {
    id, 
    userId, 
    title, 
    content,
  };

  return { code: stateCreated, blogpost };
};

module.exports = {
  createBlogpostOk,
  createBlogpostError,
}