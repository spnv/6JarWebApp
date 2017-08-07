"use strict"
var express = require('express');
var router = express.Router();

var define = require('./define');
var mongoose = require('mongoose');
mongoose.connect(define.DATABASE_URL);

var Member = require('../models/member.js');

router.route('/')
  // CREATE MEMBER
  .post(
    function(req, res, next) {
      var member = req.body;
      Member.findOne({
        email: member.email
      }, function(err, exist) {
        if (err) {
          console.log('# API UPDATE MEMBER: ', err);
        }
        if (exist) {
          res.json({
            success: false,
            message: 'email already exist',
            data: null
          });
        } else {
          Member.create(member, function(err, result) {
            if (err) {
              throw err;
            }
            res.json({
              success: true,
              message: 'create success',
              data: null
            });
          })
        }
      })
    });

router.route('/signIn')
  // GET MEMBER SESSION
  .get(
    function(req, res, next) {
      if (typeof req.session.member !== 'undefined') {
        res.json({
          success: true,
          message: 'session success',
          data: req.session.member
        });
      } else {
        res.json({
          success: false,
          message: 'no session',
          data: ''
        });
      }
    }
  )
  // STORE MEMBER SESSION
  .post(
    function(req, res, next) {
      var member = {
        email: req.body.email,
        password: req.body.password
      };
      Member.findOne(member, function(err, result) {
        if (err) {
          throw err;
        }
        // INCORRECT USERNAME PASSWORD
        if (result == null || result == undefined) {
          res.json({
            success: false,
            message: 'wrong username or password',
            data: result
          });
        }
        // CORRECT USERNAME PASSWORD
        else {
          req.session.member = result;
          req.session.save(function(err) {
            if (err) {
              throw err;
            }
            res.json({
              success: true,
              message: 'sign in success',
              data: req.session.member
            });
          })
        }
      })
    }
  )
  // KILL MEMBER SESSION
  .delete(
    function(req, res, next) {
      if (typeof req.session.member !== 'undefined') {
        req.session.destroy(function(err) {
          res.json({
            success: false,
            message: 'no session',
            data: ''
          });
        })
      } else {
        res.json({
          success: true,
          message: 'session success',
          data: req.session.member
        });
      }
    }
  );

module.exports = router;
