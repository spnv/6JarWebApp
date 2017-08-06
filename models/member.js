"use strict"
var mongoose = require('mongoose');
var memberSchema = mongoose.Schema({
  image: String,
  username: String,
  password: String,
  display: String,
  name: String,
  surname: String,
  email: String,
  phone: String,
  priority: String,
  status: String
});
var Member = mongoose.model('Members', memberSchema);
module.exports = Member;
