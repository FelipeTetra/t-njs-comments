const express = require('express');
const path = require('node:path')
const app = express();

const public = path.join(__dirname, 'public');

app.set('views', public);
app.use(express.static(public));

app.use('/', require('./routes/public'))

app.listen(3000, () => {
  console.log('Active on port 3000');
})