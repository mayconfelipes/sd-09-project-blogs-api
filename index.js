require('dotenv/config');
const express = require('express');
const users = require('./routes/user');
const categories = require('./routes/category');
const blogPost = require('./routes/blogPost');

const app = express();
app.use(express.json());
app.use('/', users);
app.use('/', categories);
app.use('/', blogPost);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
