const express = require('express');
const { User } = require('./models');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/User', (req, res) => {
  User.findAll().then((data) => {
    res.status(200).json(data);
  }).catch((e) => {
    console.log(e.message);
    res.status(500).json({ message: 'Deu ruim' });
  });
});