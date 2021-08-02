const express = require('express');
const bodyParser = require('body-parser').json();
const userRoute = require('./src/routes/user');
const loginRoute = require('./src/routes/login');
const categoriesRoute = require('./src/routes/categories');

const app = express();
app.use(bodyParser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/categories', categoriesRoute);

app.use((err, req, res, _next) => res.status(err.errorCode).json({ message: err.message }));