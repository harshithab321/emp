const mongoose = require('mongoose');


const forgot_password = new mongoose.Schema({
     userId: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    token: { type: String, default: '' },
    createdAt:{type: String, default: ''}
  });  

  module.exports = mongoose.model("forgotpassword", forgot_password)