const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

// get driver connection
const dbo = require("./db/conn");

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
  secret: process.env.SESSION_SECRET,
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/questions"));
app.use(require("./routes/engagement"));
app.use(require("./routes/motion"));

 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});