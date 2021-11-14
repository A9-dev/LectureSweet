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

app.route("/send-camera-data").post(function (req, response) {
    if (req.body.authkey == "password") {
        let db_connect = dbo.getDb();
        session=req.session;
        let myobj = {
            camera_info: req.body.camera_info
        };
    
        db_connect.collection("camera-data").insertOne(myobj, function (err, res) {
            if (err) throw err;
            response.json(res);
        });
    } else {
        response.json({
            "auth": false
        });
    }
});

app.route("/get-camera-data").get(function (req, response) {
    let db_connect = dbo.getDb();
    db_connect
    .collection("camera-data")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      counter = {};
      for (data in result) {
            if (counter[result[data]["understanding"]] != undefined) {
                previous = counter[result[data]["understanding"]];
                console.log("Adding 1 to " + previous + "  ::  " + result[data]["understanding"]);
                counter[result[data]["understanding"]] = previous + 1;
            } else {
                counter[result[data]["understanding"]] = 1;
            }
      }
      response.json(counter);
    });
  
});

module.exports = app;
