const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateDailyCases = Schema({
  Active: String,
  Confirmed: String,
  Deaths: String,
  deltaConfirmed: String,
  deltaDeaths: String,
  deltaRecovered: String,
  lastUpdatedTime: String,
  Recovered: String,
  State: String,
  StateCode: String,
  stateNotes: String,
});

module.exports = mongoose.model("statesDailyCases", stateDailyCases);
