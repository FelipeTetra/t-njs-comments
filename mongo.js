const mongoose = require('mongoose');

require('dotenv').config();

module.exports = async function () {
  try {
    const d = await mongoose.connect(process.env.DB_ACESS);
    if (d){
      console.log("Database connected!");
      return d;
    }
  } catch (err) {
    console.log("Erro:", err);
  }
};

module.exports.include = async function (name, email, password) {
  const register = new usersClone({ name: name, email: email, password: password });
  await register.save();
}

// include('Haruki', 'hk@test.com', '1234');