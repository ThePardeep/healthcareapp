const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const latLong = Schema({
  State: String,
  Districts: [
    {
      District: String,
      latitude: String,
      longitude: String,
    },
  ],
});

module.exports = mongoose.model("latlongpunjab", latLong, "latlongpunjab");
