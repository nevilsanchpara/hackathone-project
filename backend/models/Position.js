const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  streetId: {type: String, required: true},
  isWorking: {type: Boolean, required: true, default: true},
  lat: {type: Number, required: true},
  long: {type: Number, required: true},
  pincode: {type: Number, required: true},
  district: {type: String, required: true},
  taluka: {type: String, required: true},
  village: {type: String, required: true},
});

module.exports = mongoose.model("Position", positionSchema);
