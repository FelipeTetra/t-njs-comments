const mongoose = require('mongoose');

const users = new mongoose.Schema({
  name: { type: String, required: true, maxLenght: 20},
  email: { type: String, required: true, maxLenght: 100},
  password: { type: String, required: true, maxLenght:225}
});

module.exports = mongoose.model("Users", users);