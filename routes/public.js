const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function midleCheck(req, res, page) {
  const token = req.cookies.token;
  if(!token){
    return res.render(page, {logged: false});
  } else if (!jwt.tokenV(token)) {
    res.clearCookie('token');
    return res.render(page, {logged: false});
  };
  return res.render(page, {logged: true});
}


router.get('/', (req, res) => {
  midleCheck(req, res, 'index');
});

router.get('/login', (req, res) => {
  midleCheck(req, res, 'login');
});

router.get('/register', (req, res) => {
  midleCheck(req, res, 'register');
});

router.use('/auth', require('./auth'));
router.use('/comment', require('./comment'));

module.exports = router;