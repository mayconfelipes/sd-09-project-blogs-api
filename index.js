const express = require('express');
const userRoute = require('./src/routes/userRoutes');
const loginRoute = require('./src/routes/loginRoutes');
const categories = require('./src/routes/categoryRoutes');
const postRoute = require('./src/routes/postRoutes');

const app = express();

app.use(express.json());

app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/categories', categories);
app.use('/post', postRoute);

app.use((err, _req, res, _next) => {
  if (!err.status) console.log(err);
  res.status(err.status).json({ message: err.message });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
