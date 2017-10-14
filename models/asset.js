"use strict"
var mongoose = require('mongoose');
var Schema = mongoose.Schema({
  catagory: String,
  risk_level: Number,
  description: String,
  invest_amount: Number,
  owner: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});
var Asset = mongoose.model('Assets', Schema);
module.exports = Asset;
