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
    }, null, {
      sort: {
        sub_type: 1
      }
    }, function(err, items) {
      // console.log(items)

      const totalAmount = items.reduce(function(a, b) {
        return a + b.amount;
      }, 0);

      res.json({
        items : items,
        totalAmount : totalAmount
      });
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
      res.json(item);
    });
  });

router.route('/my-flow/:myflowid')
  .delete(function(req, res, next) {
    MoneyFlow.findOneAndRemove({
      _id: req.params.myflowid
    }, function(err, item) {
      if (err) {
        throw err;
      }

      res.json(item)
    });
  });

module.exports = router;
