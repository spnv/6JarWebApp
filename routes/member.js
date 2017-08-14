"use strict"
var express = require('express');
var router = express.Router();

var define = require('./define');
var mongoose = require('mongoose');
mongoose.connect(define.DATABASE_URL);

var Member = require('../models/member.js');
var MyJar = require('../models/myJar.js');

router.route('/')
  // CREATE MEMBER
  .post(
    function(req, res, next) {
      var member = req.body;
      Member.findOne({
        email: member.email
      }, function(err1, exist) {
        if (err1) {
          console.log('# API UPDATE MEMBER: ', err1);
        }
        if (exist) {
          res.json({
            success: false,
            message: 'email already exist',
            data: null
          });
        } else {
          Member.create(member, function(err2, memberData) {
            if (err2) {
              throw err2;
            }
            /* TODO : Init myJar to id */
            let jars = [{
              code: 'ff',
              display: 'ลงทุน',
              remain: 0,
              full: 0,
              selected: true
            }, {
              code: 'ed',
              display: 'ความรู้',
              remain: 0,
              full: 0,
              selected: true
            }, {
              code: 'pl',
              display: 'เล่น',
              remain: 0,
              full: 0,
              selected: true
            }, {
              code: 'lts',
              display: 'เก็บยาว',
              remain: 0,
              full: 0,
              selected: true
            }, {
              code: 'gv',
              display: 'ให้',
              remain: 0,
              full: 0,
              selected: true
            }, {
              code: 'na',
              display: 'ประจำวัน',
              remain: 0,
              full: 0,
              selected: true
            }];

            let requests = jars.map((jar, i) => {
              return new Promise((resolve) => {
                // TODO : Init my jar
                jar.owner = memberData.email
                MyJar.create(jar, function(err3, myJar) {
                  if (err3) {
                    throw err3;
                  }
                  resolve();
                });
              });
            })

            Promise.all(requests).then(function(result) {
              // res.json({
              //   success: true,
              //   message: 'create success',
              //   data: null
              // });

              req.session.member = memberData;
              req.session.save(function(err) {
                if (err) {
                  throw err;
                }
                res.json({
                  success: true,
                  message: 'create success',
                  data: req.session.member
                });
              })
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
              message: 'signin success',
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
