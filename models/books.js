"use strict"
var ObjectID = require('mongodb').ObjectID;

exports.create = function(_title, _des, _img, _price, db, callback) {
  db.collection('books')
    .insertOne({
        title: _title,
        description: _des,
        image: _img,
        price: _price
      },
      function(err, r) {
        callback(err, r);
      });
}

exports.find = function(db, callback) {
  db.collection('books')
    .find({})
    .toArray(
      function(err, r) {
        callback(err, r);
      });
};

exports.remove = function(_id, db, callback) {
  db.collection('books')
    .remove({
        _id: new ObjectID(_id)
      },
      function(err, r) {
        callback(err, r);
      });
}

exports.updateOne = function(_id, _title, _des, _img, _price, db, callback) {
  // When true returns the updated document
  var options = {
    new: true
  };
  db.collection('books')
    .updateOne({
      _id: new ObjectID(_id)
    }, {
      $set: {
        title: _title,
        description: _des,
        image: _img,
        price: _price
      },
      options
    }, function(err, r) {
      callback(err, r);
    });
}
