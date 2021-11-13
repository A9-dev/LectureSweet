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

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.route("/send-question").post(function (req, response) {
    let db_connect = dbo.getDb();
    session=req.session;
    let myobj = {
        question: req.body.question,
        student: {
            userid: session.userid,
            displayname: session.displayName
        }
    };
    db_connect.collection("questions").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
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
