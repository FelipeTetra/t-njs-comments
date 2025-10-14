const express = require('express');
const bcrypt = require('bcryptjs');
const { getEmail, include } = require('../mongo')

require('../mongo')()

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) {
    return res.render('register', { message: "Passwords are different"});
  } else if (!name || !email || !password || !passwordConfirm) {
    return res.render('register', { message: "Place all informations"});
  }

  const emailExists = await getEmail(email);

  if (emailExists) {
    return res.render('register', { message: "This email is already in use"}); 
  };

  const hashedPassword = await bcrypt.hash(password, 8);
  await include(name, email, hashedPassword)
  return res.render('register', { message: "Sucess!"}); 
});

module.exports = router;