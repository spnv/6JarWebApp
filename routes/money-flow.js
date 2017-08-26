"use strict"
var express = require('express');
var router = express.Router();

var define = require('./define');
var mongoose = require('mongoose');
mongoose.connect(define.DATABASE_URL);

var MoneyFlow = require('../models/moneyFlow.js');

router.route('/my-flow')
  .get(function(req, res, next) {
    var member = req.session.member.email;
    MoneyFlow.find({
      owner: member
    }, function(err, items) {
      res.json(items);
    });
  })
  // create
  .post(function(req, res, next) {
    let newMoneyFlowItem = req.body;
    newMoneyFlowItem.owner = req.session.member.email;
    MoneyFlow.create(newMoneyFlowItem, function(err, item) {
      if (err) {
        throw err;
      }
      res.json(newMoneyFlowItem);
    });
  });

module.exports = router;
