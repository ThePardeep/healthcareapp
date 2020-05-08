const express = require("express");
const mongoose = require("mongoose");
const database = require("./Config/Database.js");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");

const app = express();

const CovidRoute = require("./Router/CovidRoute.js");
const UserRoute = require("./Router/User.js");
const MapRoute = require("./Router/MapApi.js");

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

// PASSPORT  MIDDLEWARE

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/covid", CovidRoute);
app.use("/user", UserRoute);
app.use("/map", MapRoute);

//JWT Strategy
require("./Config/Passport.js")(passport);
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
