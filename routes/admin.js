const express = require("express");
const passport = require("passport");

const Doctor = require("../models/Doctors");

const router = express.Router();

router.post(
  "/doctors/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json({ error: "You are not an admin" });
    }
    const { name, gender, disease } = req.body;
    const newDoctor = new Doctor({ name, gender, disease });
    newDoctor
      .save()
      .then((doctor) => res.json(doctor))
      .catch((err) => res.json({ error: "Error saving doctor information" }));
  }
);

router.delete(
  "/doctors/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json({ error: "You are not an admin" });
    }
    Doctor.findOne({ _id: req.params.id })
      .then((doctor) => {
        // removing
        doctor
          .remove()
          .then(() => res.json({ success: true }))
          .catch((err) =>
            res.status(404).json({ error: "Error deleting doctor" })
          );
      })
      .catch((err) => res.status(404).json({ error: "Error deleting doctor" }));
  }
);
module.exports = router;
