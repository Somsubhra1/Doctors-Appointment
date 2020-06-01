const express = require("express");
const passport = require("passport");

const router = express.Router();

const doctors = [
  {
    id: 1466416800000,
    name: "Dr. Smith",
    gender: "Male",
    disease: "Viral fever",
  },
  {
    id: 1466737200000,
    name: "Dr. Max",
    gender: "Male",
    disease: "Back pain",
  },
  {
    id: 1466590800000,
    name: "Dr. Bob",
    gender: "Female",
    disease: "Fever and headache",
  },
  {
    id: 1466480700000,
    name: "Dr. Hanna",
    gender: "Male",
    disease: "Loose motion",
  },
];

router.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(doctors);
  }
);

module.exports = router;
