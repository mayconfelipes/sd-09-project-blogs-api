const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const loginRoute = require('./routes/loginRoute');
const categorieRoute = require('./routes/categorieRoute');
const blogPostRoute = require('./routes/blogPostRoute');

const app = express();

app.use(bodyParser.json());
app.use(userRoute);
app.use(loginRoute);
app.use(categorieRoute);
app.use(blogPostRoute);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
