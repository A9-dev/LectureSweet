const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const app = express.Router();

app.use(express.json());

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


// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


var ldap = require('ldapjs');
var client = ldap.createClient({
  url: 'ldap://ldap.soton.ac.uk/OU=User,DC=soton,DC=ac,DC=uk'
});


app.route("/attention").get(function (req, res) {
  res.json({
    attention: 0,
    somethingElse: 213
  })
});


app.route("/login").post(function (req, res) {
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

            console.log(entry.object.displayName + ' logged in');
            foundUser = true;
            session=req.session;
            session.userid=entry.object.name;
            session.dbuserid=global.userID;
            session.displayName=entry.object.displayName;
            res.json({
              authSuccess: true
            })
            console.log(session);
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

app.route("/logout").get(function (req, res) {
  req.session.destroy();
  res.send("logged out");
});

app.route("/check").get(function (req, res) {
  console.log("Check ran");
  
  res.send(req.session);
});

// This section will help you get a list of all the records.
app.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
app.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("records")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
app.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    person_name: req.body.person_name,
    person_position: req.body.person_position,
    person_level: req.body.person_level,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
app.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      person_name: req.body.person_name,
      person_position: req.body.person_position,
      person_level: req.body.person_level,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
app.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = app;