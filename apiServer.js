"use strict"
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
mongoose.connect("mongodb://admin:Nat45693822*@bunche-shard-00-00-e3yhh.mongodb.net:27017,bunche-shard-00-01-e3yhh.mongodb.net:27017,bunche-shard-00-02-e3yhh.mongodb.net:27017/webapp?ssl=true&replicaSet=Bunche-shard-0&authSource=admin");

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// --->>> SET UP SESSIONS <<<---
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2
  },
  // 2 days in milliseconds
  store: new MongoStore({
    mongooseConnection: db,
    ttl: 2 * 24 * 60 * 60
  })
  //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))

/* TODO : Template Passive - duplicate for api */
var member = require('./routes/member');
app.use('/member', member);
var jar = require('./routes/jar');
app.use('/jar', jar);
var transaction = require('./routes/transaction');
app.use('/transaction', transaction);

app.get('/images', function(req, res) {
  const imgFolder = __dirname + '/public/images/';
  // REQUIRE FILE SYSTEM
  const fs = require('fs');
  //READ ALL FILES IN THE DIRECTORY
  fs.readdir(imgFolder, function(err, files) {
    if (err) {
      return console.error(err);
    }
    //CREATE AN EMPTY ARRAY
    const filesArr = [];
    var i = 1;
    // ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE THE ARRAY
    files.forEach(function(file) {
      filesArr.push({
        name: file
      });
      i++
    });
    // SEND THE JSON RESPONSE WITH THE ARARY
    res.json(filesArr);
  })
})

app.listen(3001, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('API Sever is listening on http://localhost:3001');
});
