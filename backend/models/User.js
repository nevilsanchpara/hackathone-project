const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phone: {type: Number, required: true},
  address: {type: String, required: true},
  roleId: {type: Number, required: true},
  pincode: {type: Number, required: true},
  village: {type: String, required: true},
  taluka: {type: String, required: true},
  district: {type: String, required: true},
  state: {type: String, required: true},
});

module.exports = mongoose.model("User", userSchema);
