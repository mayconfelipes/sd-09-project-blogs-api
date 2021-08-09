const express = require('express');
const userController = require('./controller/users');
const loginController = require('./controller/login');
const categoriesController = require('./controller/categories');
const postController = require('./controller/posts');

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

app.use(express.json());

app.use('/user', userController);
app.use('/login', loginController);
app.use('/categories', categoriesController);
app.use('/post', postController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
