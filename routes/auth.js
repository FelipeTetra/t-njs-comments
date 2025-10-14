const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { getEmail, include } = require('../mongo');

jwt.secret = process.env.JWT_SECRET;
jwt.tokenV = function(t, secret = jwt.secret) {
  try {
    if(jwt.verify(t, secret))
      return true;
  } catch (err) {
    return false;
  }
}

require('../mongo')();

const router = express.Router();

router.post('/register', async (req, res) => {
  const currentToken = req.cookies.token;
  if (currentToken)
     return res.redirect('/register');
  const { name, email, password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) {
    return res.render('register', { message: "Passwords are different"});
  } else if (!name || !email || !password || !passwordConfirm) {
    return res.render('register', { message: "Place all informations"});
  };

  const emailExists = await getEmail(email);

  if (emailExists) {
    return res.render('register', { message: "This email is already in use"}); 
  };

  const hashedPassword = await bcrypt.hash(password, 8);
  await include(name, email, hashedPassword)
  const token = jwt.sign({
    name: name,
    email: email
  }, jwt.secret);

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000
  });
  return res.render('register', { message: "Sucess!"}); 
});

router.post('/login', async (req, res) => {
  const currentToken = req.cookies.token;
  if (currentToken)
     return res.redirect('/login');
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render('login', { message: "Place all informations!"});
  };

  const emailExists = await getEmail(email);
  if (!emailExists) {
    return res.render('login', { message: "This email does'nt exist."});
  };

  const compar = await bcrypt.compare(password, emailExists.password);
  if (!compar) {
    return res.render('login', { message: "Invalid password!"});
  }

  const token = jwt.sign({
    name: emailExists.name,
    email: email
  }, jwt.secret);

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000
  });

  return res.render('login', { message: `Logged with ${emailExists.name}`});
});
 
module.exports = router;