const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  User.findAll().then((data) => {
    res.status(200).json(data);
  }).catch((e) => {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu Errado!' });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Online on PORT: ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
