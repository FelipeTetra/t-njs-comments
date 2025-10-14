const express = require('express');
const bcrypt = require('bcryptjs');
const { getEmail, include } = require('../mongo');

require('../mongo')();

const router = express.Router();

router.post('/register', async (req, res) => {
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
  return res.render('register', { message: "Sucess!"}); 
});

router.post('/login', async (req, res) => {
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

  return res.render('login', { message: `Logged with ${emailExists.name}`});
});
 
module.exports = router;