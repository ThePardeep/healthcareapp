const Router = require("express").Router();
const User = require("../Schema/User");
const jwt = require("jsonwebtoken");
const keys = require("../Config/Keys");
Router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ Email: email }).then((user) => {
    if (user) {
      if (user.Password == password) {
        jwt.sign(
          {
            Email: user.Email,
            Role: user.Role,
            Name: user.Name,
            id: user._id,
            provider: "Email",
          },
          keys.JwtSecret,
          {
            expiresIn: "1h",
          },
          (err, token) => {
            if (err) {
              res.status(200).json({
                error: true,
                msg: "Token Error",
              });
            } else {
              const Decode = jwt.decode(token);
              res.status(200).json({
                Token: "Bearer  " + token,
                error: false,
                expiresIn: Decode.exp,
                iat: Decode.iat,
              });
            }
          }
        );
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
