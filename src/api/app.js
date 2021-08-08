const express = require('express');
const bodyParser = require('body-parser');

const route = require('../routes/routes');

const app = express();
app.use(bodyParser.json());
app.use(route);
module.exports = app; 
