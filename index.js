const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// const config = require('./config/config');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.MYSQL_USER);
app.use(bodyParser.json());

app.listen(3000, () => console.log('O Pai Tá ON!!!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('Pai tá ON!!!');
});

// app.post('/user', createUser);
