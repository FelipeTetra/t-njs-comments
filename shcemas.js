const mongoose = require('mongoose');

const users = new mongoose.Schema({
  name: { type: String, required: true, maxLenght: 20},
  email: { type: String, required: true, maxLenght: 100},
  password: { type: String, required: true, maxLenght:225}
});

const comments = new mongoose.Schema({
  name: { type: String, required: true, maxLenght: 20 },
  email: { type: String, required: true, maxLenght: 100 },
  message: { type: String, required: true, maxLenght: 6000 }
})

module.exports = mongoose.model("Users", users);
module.exports.comments = mongoose.model("Comments", comments);