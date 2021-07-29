const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controllers');

const app = express();

app.use(bodyParser.json());

app.use('/user', controller.userRouter);
app.use('/login', controller.loginRouter);
app.use('/categories', controller.categoryRouter);
app.use('/post', controller.blogPostRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// não remova esse endpoint, e para o avaliador funcionar

app.listen(3000, () => console.log('ouvindo porta 3000!'));

module.exports = app;