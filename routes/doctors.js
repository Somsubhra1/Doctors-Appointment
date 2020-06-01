const express = require("express");
const passport = require("passport");

const Doctor = require("../models/Doctors");

const router = express.Router();

router.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Doctor.find()
      .then((doctors) => res.json(doctors))
      .catch((err) => res.json({ error: "Error fetching doctors list" }));
  }
);

module.exports = router;
