const express = require("express");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../models/Users");

const key = process.env.secret;

const router = express.Router();

// /auth/signup route : POST
router.post("/signup", (req, res) => {
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
});

// /auth/login route : POST
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
          .json({ error: "Username or Password is not correct" });
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
              isAdmin: user.isAdmin,
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
                  id: payload.id,
                  name: payload.name,
                  email: payload.email,
                  isAdmin: payload.isAdmin,
                });
              }
            });
          } else {
            // Password didn't match
            res.status(400).json({
              error: "Username or Password is not correct",
            });
          }
        })
        // Error comparing passwords
        .catch((err) => console.log(err));
    })
    // Error finding user
    .catch((err) => console.log(err));
});

// /auth/profile route : POST (Authenticated)
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    });
  }
);

router.patch(
  "/profile/updatepassword",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        // Handling error
        if (err) {
          throw err;
        }
        password = hash;

        // Storing to db
        User.findByIdAndUpdate(req.user.id, { $set: { password } })
          .then((user) => {
            res.json({ success: true });
          })
          .catch((err) => res.json({ error: "Couldn't update password" }));
      });
    });
  }
);

// /auth/logout route : POST (Authenticated)
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.logout();
    return res.json({ success: true });
  }
);

module.exports = router;
