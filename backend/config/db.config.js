const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(
      "mongodb+srv://aakalp:aakalp@cluster0.bkks1ke.mongodb.net/?retryWrites=true&w=majority"
    )
    // .connect("mongodb://localhost:27017/hospital-manegment")
    // mongoose.connect(db.localdb)
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));
};
