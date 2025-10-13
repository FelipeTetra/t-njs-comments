const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).send("Initial Page");
})

module.exports = routes;