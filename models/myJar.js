"use strict"
var mongoose = require('mongoose');
var Schema = mongoose.Schema({
  code: String,
  display: String,
  remain: Number,
  full: Number,
  selected: Boolean,
  owner: String
});
var MyJar = mongoose.model('MyJars', Schema);
module.exports = MyJar;
