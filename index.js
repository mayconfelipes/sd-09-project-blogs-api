const express = require('express');

const {
  userControll,
} = require('./controllers');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', userControll);


app.listen(PORT, () => console.log(`Pai ta no dale na porta  ${PORT}!`));
