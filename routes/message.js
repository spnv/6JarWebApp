"use strict"
var express = require('express');
var router = express.Router();

var define = require('./define');
var mongoose = require('mongoose');
mongoose.connect(define.DATABASE_URL);

var Message = require('../models/message.js');

router.route('/my-msg')
  // create
  .post(function(req, res, next) {
    let message = req.body;
    Message.create(message,
      function(err, createdNewMsg) {
        if (err) {
          throw err;
        }
        res.json(createdNewMsg);
      });
  });

module.exports = router;
