"use strict"
var mongoose = require('mongoose');
var memberSchema = mongoose.Schema({
  email: String,
  password: String,
  name: String
});
var Member = mongoose.model('Members', memberSchema);
module.exports = Member;
