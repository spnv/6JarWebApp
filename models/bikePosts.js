"use strict"
var mongoose = require('mongoose');
var bikePostSchema = mongoose.Schema({
  username: String,
  image: [String],
  title: String,
  detail: String,
  price: Number,
  mile: Number,
  province: String,
  phone: String,
  type: String,
  citizen_id: String,
  car_book: String,
  contact: String,
  status: String,
  create: Date
});
var BikePost = mongoose.model('BikePosts', bikePostSchema);
module.exports = BikePost;
