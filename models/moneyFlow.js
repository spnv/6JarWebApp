"use strict"
var mongoose = require('mongoose');
var Schema = mongoose.Schema({
  owner: String,
  type: String,
  sub_type: String,
  amount: Number,
  description: String
});
var MoneyFlow = mongoose.model('MoneyFlow', Schema);
module.exports = MoneyFlow;
