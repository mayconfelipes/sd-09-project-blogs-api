const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(routes);

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  res.status(500).json({ message: `Internal Error: ${err.message}` });
});

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
