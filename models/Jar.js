"use strict"
var mongoose = require('mongoose');
var Schema = mongoose.Schema({
  code: String,
  display: String
});
var Jar = mongoose.model('Jars', Schema);
module.exports = Jar;
