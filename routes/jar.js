"use strict"
var express = require('express');
var router = express.Router();

var define = require('./define');
var mongoose = require('mongoose');
mongoose.connect(define.DATABASE_URL);

var MyJar = require('../models/myJar.js');

router.route('/my-jar')
  // GET SELECTED JARS LIST
  .get(
    function(req, res, next) {
      var member = req.session.member.email;
      MyJar.find({
        owner: member
      }, function(err, jars) {
        res.json(jars);
      });
    }
  )
  .patch(
    function(req, res, next) {
      MyJar.findOneAndUpdate({
        _id: req.body._id
      }, req.body, {
        new: true
      }, function(err, updated) {
        res.json(updated);
      });
    }
  );;

router.route('/my-selected')
  // GET SELECTED JARS LIST
  .get(
    function(req, res, next) {
      var member = req.session.member.email;
      MyJar.find({
        selected: true,
        owner: member
      }, function(err, jars) {
        res.json(jars);
      });
    }
  )
  // CREATE JAR
  .post(function(req, res, next) {
    var myNewJar = req.body;
    myNewJar.owner = req.params.username;
    MyJar.create(myNewJar,
      function(err, newJar) {
        if (err) {
          throw err;
        }
        res.json(newJar);
      });
  });

router.route('/my-non-selected')
  // GET NON SELECTED JARS LIST
  .get(
    function(req, res, next) {
      var member = req.session.member.email;
      MyJar.find({
        selected: false,
        owner: member
      }, function(err, jars) {
        res.json(jars);
      });
    }
  );

// router.route('/my-jar/code/:code')
//   // update
//   .patch(
//     function(req, res, next) {
//       MyJar.findOneAndUpdate({
//         code: req.params.code
//       }, req.body, {
//         new: true
//       }, function(err, updated) {
//         res.json(updated);
//       });
//     }
//   );

module.exports = router;
