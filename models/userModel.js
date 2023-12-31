const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  postTheUsers: {
    type: Array,
  },
  folowingUsers: {
    type: Array,
  },
});

module.exports = mongoose.model("Users", userSchema);
