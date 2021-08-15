const express = require('express');
require('dotenv/config');
const bodyParser = require('body-parser');
const { 
  userRouter,
   } = require('./routes/userRouter');
const { loginRouter } = require('./routes/loginRouter');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(userRouter);
app.use(loginRouter);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
