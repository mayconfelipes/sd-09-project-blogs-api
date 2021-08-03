const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const {
  userController,
  loginController,
  categoriesController,
  postController,
} = require('./controllers');
const { error } = require('./middlewares');

const app = express();

app.use(bodyParser.json());

app.use(express.json());

app.use('/user', rescue(userController));
app.use('/login', rescue(loginController));
app.use('/categories', rescue(categoriesController));
app.use('/post', rescue(postController));
app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});