const Router = require("express").Router();
const User = require("../Schema/User");
const axios = require("axios");

Router.post("/login", (req, res) => {
  const { Email, Password } = req.body;
  Email = Email.toLowerCase();

  User.findOne({ Email }).then((user) => {
    if (user) {
      if (user.Password == Password) {
      } else {
        res.status(200).json({
          error: true,
          msg: "Password Not Correct",
        });
      }
    } else {
      res.status(200).json({
        error: true,
        msg: "User Not Exist",
      });
    }
  });
});

module.exports = Router;
