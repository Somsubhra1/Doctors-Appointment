const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DoctorsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  disease: {
    type: String,
    required: true,
  },
});

module.exports = Doctors = mongoose.model("doctors", DoctorsSchema);
