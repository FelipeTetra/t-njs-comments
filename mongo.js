const mongoose = require('mongoose');
const users = require('./shcemas');
const { comments } = require('./shcemas');
require('dotenv').config({path: './.env'});

module.exports = async function () {
  try {
    const d = await mongoose.connect(process.env.DB_ACESS);
    if (d){
      console.log("Database connected!");
      return d;
    };
  } catch (err) {
    console.log("Erro:", err);
  };
};

module.exports.include = async function (name, email, password) {
  const register = new users({ name: name, email: email, password: password });
  await register.save();
};

module.exports.getEmail = async function (email) {
  return await users.findOne({ email: email });
};

module.exports.getComments = async function () {
  return await comments.find()
};

module.exports.newComment = async function (name, email, message) {
  const register = new comments({ name: name, email: email, message: message });
  await register.save();
}

// include('Haruki', 'hk@test.com', '1234');