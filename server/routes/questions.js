const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const app = express.Router();

app.use(express.json());
const cors = require("cors");

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
// const { session } = require("passport");

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(sessions({
  secret: process.env.SESSION_SECRET,
  saveUninitialized:true,
  cookie: {
    maxAge: oneDay,
    httpOnly: false // <- set httpOnly to false
  },
  resave: false,
  domain: "http://localhost:5000"
}));
app.use(cookieParser());
// a variable to save a session
var session;

var ldap = require('ldapjs');
var client = ldap.createClient({
  url: 'ldap://ldap.soton.ac.uk/OU=User,DC=soton,DC=ac,DC=uk'
});

app.route("/send-question").post(function (req, response) {
    console.log(process.env.SESSION_SECRET);
    let db_connect = dbo.getDb();

    var opts = {
        filter: '(cn=' + req.body.username + ')',
        scope: 'sub',
        attributes: ['name', 'displayName', 'employeeID']
      };
      global.currentStudentId = req.body.username;
      client.bind("", "", function (err) {
        foundUser = false;
        try {
          client.search('OU=User,DC=soton,DC=ac,DC=uk', opts, function (err, search) {
            search.on('searchEntry', function (entry) {
              let db_connect = dbo.getDb("employees");
              if(entry.object){
                let myquery = { studentID: global.username };
                db_connect
                    .collection("users")
                    .findOne(myquery, function (err, result) {
                      if (err) throw err;
                      global.queryres = result;
                    });
                if (global.queryres == null) {
                  let myobj = {
                    name: entry.object.displayName,
                    studentID: entry.object.employeeID
                  };
                  db_connect.collection("users").insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    global.userID = res._id;
                  });
                } else {
                  global.userID = global.queryres._id;
                }
                if (entry.object.displayName != null && entry.object.displayName != undefined) {
                    let myobj = {
                        question: req.body.question,
                        student: {
                            userid: entry.object.employeeID,
                            displayname: entry.object.displayName
                        }
                    };
                    db_connect.collection("questions").insertOne(myobj, function (err, res) {
                        if (err) throw err;
                        response.json(res);
                    });
                } else {
                    response.json({
                        "auth": false
                    });
                }
              }
            });
            search.on('error', function(error) {
              console.error('Failed Auth');
              res.json({
                authSuccess: false
              })
            });
          });
        } catch {
          res.json({
            authSuccess: false
          })
        }
        
      });
});

app.route("/get-questions").get(function (req, response) {
    let db_connect = dbo.getDb();
    db_connect
    .collection("questions")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      response.json(result);
    });
  
});

module.exports = app;
