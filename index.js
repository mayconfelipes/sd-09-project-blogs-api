const express = require('express');
const users = require('./src/routes/userRoute');
const login = require('./src/routes/loginRoute');
const categories = require('./src/routes/categoriesRoute');
const posts = require('./src/routes/postsRoute.js');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(users);
app.use(login);
app.use(categories);
app.use(posts);

app.listen(3000, () => console.log('ouvindo porta 3000!')); 