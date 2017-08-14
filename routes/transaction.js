"use strict"
var express = require('express');
var router = express.Router();

var define = require('./define');
var mongoose = require('mongoose');
mongoose.connect(define.DATABASE_URL);

var Member = require('../models/member.js');
var Transaction = require('../models/transaction.js');

router.route('/today')
  .get(function(req, res, next) {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    var member = req.session.member.email;
    Transaction.find({
      owner: member,
      timestamp: {
        $gte: now
      }
    }, function(err, jars) {
      res.json(jars);
    });
  })
  // create
  .post(function(req, res, next) {
    let newTransaction = req.body;
    newTransaction.owner = req.session.member.email;
    Transaction.create(newTransaction,
      function(err, newTransaction) {
        if (err) {
          throw err;
        }
        res.json(newTransaction);
      });
  });

router.route('/today/:tranid')
  .delete(function(req, res, next) {
    Transaction.remove({
      _id: req.params.tranid
    }, function(err, result) {
      if (err) {
        throw err;
      }
      res.json({
        _id: req.params.tranid
      })
    });
  });

module.exports = router;