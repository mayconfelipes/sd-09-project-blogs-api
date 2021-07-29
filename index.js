const express = require('express');
const router = require('./routes/router');
const mdwError = require('./middlewares/mdwGenericError');

const app = express();
const PORTFIXED = 3000;
const PORT = process.env.PORT || PORTFIXED;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(router);
app.use(mdwError.errorMiddleware);

app.listen(PORT, () => { console.log(`App listening on port ${PORT}!`); });