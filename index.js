require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const UserRouter = require('./routers/User');
const LoginRouter = require('./routers/Login');
const CategoriesRouter = require('./routers/Categories');
const PostRouter = require('./routers/Post');

const app = express();
app.use(bodyParser.json());

app.use('/user', UserRouter);
app.use('/login', LoginRouter);
app.use('/categories', CategoriesRouter);
app.use('/post', PostRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));