const express = require('express');
const bodyParser = require('body-parser');
const { userRouter, loginRouter, categoriesRouter } = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/login', loginRouter);

app.use('/user', userRouter);

app.use('/categories', categoriesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Online on PORT: ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
