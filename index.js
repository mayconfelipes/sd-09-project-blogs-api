const app = require('./src/api/app');

app.get('/', (_request, response) => {
  response.send();
 });
app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
