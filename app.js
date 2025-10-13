const express = require('express');

const app = express();

app.get('/', (req, res) => {
  console.log('User acess "/"');
})

app.listen(3000, () => {
  console.log('Active on port 3000');
})