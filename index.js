require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const PORT = 3000;
// process.env.PORT ||
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(' BlogsApi Server listening on port 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoutes);
