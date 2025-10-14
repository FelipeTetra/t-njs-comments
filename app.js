const express = require('express');
const path = require('node:path');
const cookie = require('cookie-parser');
const app = express();

app.set('view engine', 'hbs');
app.use(cookie());

// Public Route
const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));

// Views
app.set('views', path.join(__dirname, './views'));

// JSON interpreter
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./routes/public'));

app.listen(3000, () => {
  console.log('Active on port 3000');
});
