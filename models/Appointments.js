const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  // doctor: {
  //   type: Schema.Types.ObjectId,
  //   ref: "doctor",
  // },
  email: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = Appointments = mongoose.model(
  "appointments",
  AppointmentsSchema
);
