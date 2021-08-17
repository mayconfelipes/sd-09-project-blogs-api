const express = require('express');
const bodyParser = require('body-parser');

const User = require('./controllers/User');
const Category = require('./controllers/Category');
const Post = require('./controllers/Post');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', User);
app.use('/categories', Category);
app.use('/post', Post);

app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}!`));
