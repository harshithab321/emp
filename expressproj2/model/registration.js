const mongoose = require('mongoose');


const registration = new mongoose.Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    token: { type: String, default: '' }
  });  

  module.exports = mongoose.model("registration", registration)