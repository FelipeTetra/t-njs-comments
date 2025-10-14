const express = require('express');
const path = require('node:path');
const hbs = require('hbs');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path: './.env'});

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));
const publicDir = path.join(__dirname, './public');

// Rota pública
app.use(express.static(publicDir));

app.use('/', require('./routes/public'));
app.use('/db', require('./mongo'))

app.listen(3000, () => {
  console.log('Active on port 3000');
});
