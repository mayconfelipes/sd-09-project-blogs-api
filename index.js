const express = require('express');
const userController = require('./controller/userController');
const loginController = require('./controller/loginController');
const categoriesController = require('./controller/categorieController');

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

app.use(express.json());

app.use('/user', userController);
app.use('/login', loginController);
app.use('/categories', categoriesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
