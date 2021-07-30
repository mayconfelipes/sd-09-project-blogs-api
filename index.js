const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// executado assim: NODE_ENV=test node index.js 
// peth fica assim process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
require('dotenv').config({ path: './.env' }); 

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', require('./controllers/userController'));
app.use('/login', require('./controllers/loginController'));
app.use('/categories', require('./controllers/categorieController'));
app.use('/post', require('./controllers/postController'));

app.listen(3000, () => console.log('ouvindo porta 3000!'));

module.exports = app;
