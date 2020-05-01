const express = require("express");
const mongoose = require("mongoose");
const database = require("./Helper/Database.js");
const bodyParser = require("body-parser");
var schedule = require("node-schedule");
const path = require("path");

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

//Routes
app.use("/covid", CovidRoute);

//PRODUCTION Setup

if (process.env.NODE_ENV === "production") {
  // SET STATIC FOLDER
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//SERVER LISTENER
app.listen(PORT, () => {
  console.log(`Server Running On PORT ${PORT}`);
});
