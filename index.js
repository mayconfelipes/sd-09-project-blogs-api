const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/error');
const User = require('./controllers/User');
const Login = require('./controllers/Login');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use(express.json());

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/User', User.registerUser);

app.post('/login', Login.userLogin);

// app.get('/User', (req, res) => {
//     User.findAll().then((data) => {
//         res.status(200).json(data);
//       }).catch((e) => {
//           console.log(e.message);
//           res.status(500).json({ message: 'Deu ruim' });
//         });
//       });

app.use(errorMiddleware);
