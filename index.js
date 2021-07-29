const express = require('express');
const app = require('./src/api/app');

const index = express();
index.use(app);
index.get('/', (request, response) => {
  console.log('testando');
  response.send();
});
index.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
