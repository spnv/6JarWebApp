"use strict"
var mongoose = require('mongoose');
var Schema = mongoose.Schema({
  code: String,
  display: String,
  description: String,
  amount: Number,
  type: String,
  owner: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});
var Transaction = mongoose.model('Transactions', Schema);
module.exports = Transaction;
