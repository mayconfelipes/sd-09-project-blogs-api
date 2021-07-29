const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routers/router');

const app = express();
app.use(bodyParser.json());
app.use(router);
module.exports = app; 
