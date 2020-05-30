const express = require("express");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../models/Users");

const key = process.env.secret;

const router = express.Router();

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    // even if the collection is not found it enters then() part not catch() part
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
              .then((user) => res.json(user))
              // Error saving to db
              .catch((err) => console.log(err));
          });
        });
      }
    })
    // Error finding user in db
    .catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
  // const email = req.body.email;
  // const password = req.body.password;
  const { email, password } = req.body; // es6 destructuring

  // Finding user from db with email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ emailerror: "User not found with this email" });
      }
      // comparing hashed password from db with the user entered password
      bcrypt
        .compare(password, user.password)
        .then((isCorrect) => {
          if (isCorrect) {
            // Use payload and create token
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              gender: user.gender,
              profilepic: user.profilepic,
            };
            // Signing jwt token
            jsonwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
              if (err) {
                // error signing token
                throw err;
              } else {
                // success signing token
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            });
          } else {
            // Password didn't match
            res.status(400).json({
              error: "Password is not correct",
            });
          }
        })
        // Error comparing passwords
        .catch((err) => console.log(err));
    })
    // Error finding user
    .catch((err) => console.log(err));
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
