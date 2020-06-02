const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const Doctor = require("../models/Doctors");
const User = require("../models/Users");

const router = express.Router();

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json({ error: "You are not an admin" });
    }
    const { name, email, password, isAdmin } = req.body;

    User.findOne({ email })
      .then((user) => {
        if (user) {
          // user already present error
          return res.status(400).json({ error: "Email is already registered" });
        } else {
          // New user creation
          const newUser = new User({
            name,
            email,
            password,
            isAdmin,
          });

          // Encrypting password using bcryptjs
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              // Handling error
              if (err) {
                throw err;
              }
              newUser.password = hash;

              // Storing to db
              newUser
                .save()
                .then(({ email, name, id, isAdmin }) =>
                  res.json({ email, name, id, isAdmin })
                )
                // Error saving to db
                .catch((err) => console.log(err));
            });
          });
        }
      })
      // Error finding user in db
      .catch((err) => console.log(err));
  }
);

router.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json({ error: "You are not an admin" });
    }
    User.find({ isAdmin: true })
      .then((users) => res.json(users))
      .catch((err) => console.log(err));
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json({ error: "You are not an admin" });
    }
    User.findOne({ _id: req.params.id })
      .then((user) => {
        user
          .remove()
          .then(() => res.json({ success: true }))
          .catch((err) =>
            res.status(404).json({ error: "Error deleting admin" })
          );
      })
      .catch((err) => res.status(404).json({ error: "Error deleting admin" }));
  }
);

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
