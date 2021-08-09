const express = require('express');
/* este projeto tem participação  da trinca de 9: Joao Vitor Joao Pedro */
const {
  userContrl,
  loginContrl,
  controlCateg,
} = require('./controllers');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', userContrl);
app.use('/login', loginContrl);
app.use('/categories', controlCateg);

app.listen(PORT, () => console.log(`Breja na porta ${PORT}!`));
