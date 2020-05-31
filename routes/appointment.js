const express = require("express");
const passport = require("passport");

const Appointment = require("../models/Appointments");

const router = express.Router();

router.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Appointment.find({ user: req.user.id })
      .then((appointment) => {
        if (!appointment) {
          return res.status(404).json({ error: "No appointments found" });
        }
        return res.json(appointment);
      })

      .catch((err) => console.log("Error finding appointments: " + err));
  }
);

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newAppointment = new Appointment({
      user: req.user.id,
      email: req.body.email,
      doctorName: req.body.doctorName,
      patientName: req.body.patientName,
      age: req.body.age,
      gender: req.body.gender,
      date: req.body.date,
      description: req.body.description,
    });

    newAppointment
      .save()
      .then((appointment) => res.json(appointment))
      .catch((err) => console.log("Unable to push Appointment to db: " + err));
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Appointment.findOne({ _id: req.params.id })
      .then((appointment) => {
        // if user id matches
        if (appointment.user.toString() === req.user.id.toString()) {
          // removing
          appointment
            .remove()
            .then(() => res.json({ success: true }))
            .catch((err) =>
              res.status(404).json({ error: "Error deleting appointment" })
            );
        }
      })
      .catch((err) =>
        res.status(404).json({ error: "Error deleting appointment" })
      );
  }
);

module.exports = router;
