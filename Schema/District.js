const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DistrictData = Schema({
  State: String,
  Districts: [
    {
      DistrictName: String,
      Notes: String,
      Active: String,
      Confirmed: String,
      Deceased: String,
      Recovered: String,
      Delta: {
        Confirmed: String,
        Deceased: String,
        Recovered: String,
      },
    },
  ],
});

module.exports = mongoose.model("districtData", DistrictData);
