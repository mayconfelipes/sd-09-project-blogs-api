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

const replyCategoryIds = (answer) => {
  if (answer === 'WHERE parameter "id" has invalid "undefined" value') {
    return { code: stateBadRequest, phrase: '"categoryIds" is required' };
  }
  if (answer.length === 0) {
    return { code: stateBadRequest, phrase: '"categoryIds" not found' };
  }
};

const createBlogpostError = (answer) => {
  const categoryIdsError = replyCategoryIds(answer);
  if (categoryIdsError) return categoryIdsError;

  const titleError = replyTitle(answer);
  if (titleError) return titleError;

  const contentError = replyContent(answer);
  if (contentError) return contentError;
};

// cria um blogpost com sucesso mudei o nome da funçao no service por causa do lint no
const createBpOk = ({ id, userId, title, content }) => {
  const blogpost = {
    id, 
    userId, 
    title, 
    content,
  };

  return { code: stateCreated, blogpost };
};

const showAllBlogPostOk = (blogpost) => {

  return { code: stateBadRequest, blogpost };  
}

module.exports = {
  createBpOk,
  createBlogpostError,
  showAllBlogPostOk,
};
