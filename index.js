const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const C = require('./controllers');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Ouvidos posicionados na porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', [
    C.ValidateNewUser,
    C.GenerateToken,
    C.InsertUser,
  ]);

app.get('/user', [
    C.ValidateToken,
    C.GetAllUsers,
  ]);

app.get('/user/:id', [
  C.ValidateToken,
  C.GetUserById,
]);

app.post('/login', [
    C.ValidateLogin,
    C.GenerateToken,
    C.LoginSuccessFul,
  ]);

app.post('/categories', [
  C.ValidateToken,
  C.InsertCategory,
]);

app.get('/categories', [
  C.ValidateToken,
  C.GetAllCategories,
]);

app.use((err, _req, res, _next) => {
  console.error(err);
  return res.status(500).send('Algo deu errado');
});
