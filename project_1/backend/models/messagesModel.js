const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
  name: String,
  email: String,
  input: String,
});

module.exports = mongoose.model("users", messagesSchema);
