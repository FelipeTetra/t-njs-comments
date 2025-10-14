const express = require('express');
const jwt = require('jsonwebtoken');
const { newComment, getComments } = require('../mongo');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.post('/new', async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  } else if (!jwt.tokenV(token)) {
    res.clearCookie('token');
    return res.redirect('/login');
  };

  const { name, email} = jwt.decode(token);
  const { comment } = req.body;

  if (!comment || !comment.length > 16) {
    return res.render('index', { message: 'Place more than 16 characters' });
  }
  newComment(name, email, comment);
  return res.render('index', {message: "Created!"});
});

router.post('/get', async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  } else if (!jwt.tokenV(token)) {
    res.clearCookie('token');
    return res.status(401).json({ error: 'Unauthorized' });
  };

  const allComments = await getComments();
  console.log(allComments);
  const list = [];

  allComments.forEach((i, index) => {
    const { name, message } = i;
    list[index] = [ name, message ];
  });

  res.send(list);
})

module.exports = router;