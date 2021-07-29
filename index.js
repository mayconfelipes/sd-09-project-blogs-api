const express = require('express');
require('dotenv').config();

const app = express();
const { PORT } = process.env;

app.listen(PORT || 3000, () => console.log(`ouvindo porta ${PORT || 3000}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
