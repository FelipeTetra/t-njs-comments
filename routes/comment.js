const express = require('express');
const router = express.Router();

router.post('/new', (req, res) => {
  console.log('User acessed that');
})

module.exports = router;