const express = require("express");
const mongoose = require("mongoose");
const database = require("./Helper/Database.js");
const bodyParser = require("body-parser");
var schedule = require("node-schedule");
const path = require("path");
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 6;
rule.hour = 23;
rule.minute = 0;
rule.second = 0;

const app = express();

const CovidRoute = require("./Router/CovidRoute.js");

//DATABASE CONNECTION

// @Connect MongoDb
mongoose.connect(
  database.url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      throw err;
    }
    console.log("MongoDb Connected");
  }
);

//PORT
const PORT = process.env.PORT || 5000;

// Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//SET STATIC FOLDER
app.use("/static", express.static("/public"));
app.use(express.static("client/build"));

//PRODUCTION Setup

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client/build", "index.html")
    );
  });
}

var j = schedule.scheduleJob(rule, function () {
  console.log("The answer to life, the universe, and everything!");
});
//Routes
app.use("/covid", CovidRoute);

//SERVER LISTENER
app.listen(PORT, () => {
  console.log(`Server Running On PORT ${PORT}`);
});
