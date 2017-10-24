"use strict"
var mongoose = require('mongoose');
var messageSchema = mongoose.Schema({
  name: String,
  email: String,
  type: String,
  message: String
});
var Messages = mongoose.model('Messages', messageSchema);
module.exports = Messages;
