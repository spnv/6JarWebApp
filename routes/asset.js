"use strict"
var express = require('express');
var router = express.Router();

var define = require('./define');
var mongoose = require('mongoose');
mongoose.connect(define.DATABASE_URL);

var Asset = require('../models/asset.js');

router.route('/my-asset')
  .get(function(req, res, next) {
    var member = req.session.member.email;
    Asset.find({
      owner: member
    }, null, {}, function(err, items) {
      const totalAmount = items.reduce(function(a, b) {
        return a + b.invest_amount;
      }, 0);
      res.json({
        items: items,
        totalAmount: totalAmount
      });
    });
  })
  // create
  .post(function(req, res, next) {
    let newAssetItem = req.body;
    newAssetItem.owner = req.session.member.email;
    Asset.create(newAssetItem, function(err, item) {
      if (err) {
        throw err;
      }
      res.json(item);
    });
  });

router.route('/my-asset/:myassetid')
  .delete(function(req, res, next) {
    Asset.findOneAndRemove({
      _id: req.params.myassetid
    }, function(err, item) {
      if (err) {
        throw err;
      }
      res.json(item)
    });
  });

module.exports = router;
