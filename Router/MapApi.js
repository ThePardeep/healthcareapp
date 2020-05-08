const Router = require("express").Router();
const LatLongSchema = require("../Schema/latlongpunjab");
const keys = require("../Config/Keys");
const Axios = require("axios");

Router.post("/get/hospitals", (req, res) => {
  const { State, District } = req.body;
  if (State == "" || District == "") {
    res.status(200).json({
      error: true,
      msg: "Invalid State Or District",
    });
    return;
  }

  LatLongSchema.findOne({
    State: State,
  })
    .then((doc) => {
      if (doc) {
        let coordinate = "";
        for (let index = 0; index < doc.Districts.length; index++) {
          const element = doc.Districts[index];
          if (element.District.toLowerCase() == District.toLowerCase()) {
            coordinate = element;
            false;
          }
        }
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
          coordinate.latitude + "," + coordinate.longitude
        }&radius=1500&type=hospital&key=${keys.mapkey}`;

        Axios.get(url)
          .then((result) => {
            console.log(result);
            if (result.data.results.length > 0) {
              res.status(200).json({
                error: false,
                hospitals: result.data,
                coordinate,
              });
            } else {
              res.status(200).json({
                error: true,
                msg: result.data.status,
              });
            }
          })
          .catch((err) => {
            res.status(200).json({
              error: true,
              msg: "Invalid State Or District",
            });
          });
      } else {
        res.status(200).json({
          error: true,
          msg: "Invalid State Or District",
        });
      }
    })
    .catch((err) => {
      res.status(200).json({
        error: true,
        msg: "Invalid State Or District",
      });
    });
});

Router.post("/get/next/hospitals", (req, res) => {
  const { nextToken, coordinate } = req.body;

  if (nextToken == "" || coordinate == null) {
    res.status(200).json({
      error: true,
      msg: "Invalid Token Or Coordinate",
    });
    return;
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
    coordinate.latitude + "," + coordinate.longitude
  }&radius=1500&type=hospital&key=${keys.mapkey}&pagetoken=${nextToken}`;

  Axios.get(url)
    .then((result) => {
      if (result.data.results.length > 0) {
        res.status(200).json({
          error: false,
          hospitals: result.data,
          coordinate,
        });
      } else {
        res.status(200).json({
          error: true,
          msg: result.data.status,
        });
      }
    })
    .catch((err) => {
      res.status(200).json({
        error: true,
        msg: "Server Error",
      });
    });
});

module.exports = Router;
