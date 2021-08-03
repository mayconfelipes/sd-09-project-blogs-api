const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
require('dotenv');

const app = express();
app.use(bodyParser.json());

app.post('/user', userController.createUser);
app.post('/login', userController.login);
app.use((err, _req, res, _next) => {
  if (!err.status) {  
    return res.status(500).json(err.message);
  }
  console.log(err);
  res.status(err.status).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
