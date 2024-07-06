const mongoose = require('mongoose');


const userlogin = new mongoose.Schema({
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    token: { type: String, default: '' }
  });  

  module.exports = mongoose.model("login", userlogin)