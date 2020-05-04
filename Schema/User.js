const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = Schema({
  Email: String,
  Password: String,
  Role: String,
});

module.exports = mongoose.model("Admins", User);
