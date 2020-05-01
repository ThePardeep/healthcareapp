const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyCase = Schema({
  dailyConfirmed: String,
  dailyDeceased: String,
  dailyRecovered: String,
  date: String,
  totalConfirmed: String,
  totalDeceased: String,
  totalRecovered: String,
});

module.exports = mongoose.model("DailyCase", DailyCase);
