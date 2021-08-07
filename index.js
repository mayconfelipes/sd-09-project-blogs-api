const express = require('express');
const router = require('./routes');

const PORT = 3000;
const app = express();
app.use(express.json());

app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(router);
