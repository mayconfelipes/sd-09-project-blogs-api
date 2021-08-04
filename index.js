const express = require('express');
const bodyParser = require('body-parser');
require('dotenv');
// const { User } = require('./models');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const { isValidToken } = require('./middlewares/validateToken');
const error = require('./services/error');

const app = express();

app.use(bodyParser.json());

app.post('/user', userController.generateUser);
app.post('/login', userController.generateLogin);

app.get('/user', isValidToken, userController.getAll);
app.get('/user/:id', isValidToken, userController.getById);
app.post('/categories/', isValidToken, categoryController.createCategory);

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json(error.expiredOrInvalidToken.message);
  }
  if (!err.status) return res.status(500).json(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
