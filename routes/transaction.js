"use strict"
var express = require('express');
var router = express.Router();

var define = require('./define');
var mongoose = require('mongoose');
mongoose.connect(define.DATABASE_URL);

var Transaction = require('../models/transaction.js');

router.route('/today')
  .get(function (req, res, next) {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    var member = req.session.member.email;
    Transaction.find({
      owner: member,
      timestamp: {
        $gte: now
      }
    }, function (err, jars) {
      res.json(jars);
    });
  })
  // create
  .post(function (req, res, next) {
    let newTransaction = req.body;
    newTransaction.owner = req.session.member.email;
    Transaction.create(newTransaction,
      function (err, createdNewTransaction) {
        if (err) {
          throw err;
        }
        res.json(createdNewTransaction);
      });
  });

router.route('/today/:tranid')
  .delete(function (req, res, next) {
    Transaction.remove({
      _id: req.params.tranid
    }, function (err, result) {
      if (err) {
        throw err;
      }
      res.json({
        _id: req.params.tranid
      })
    });
  });

router.route('/group')
  .get(function (req, res, next) {
    Transaction.find().distinct('group', function (err, groups) {
      if (err) {
        throw err;
      }
      res.json({
        groups: groups
      })
    });
  });

module.exports = router;
