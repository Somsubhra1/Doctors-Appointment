const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Importing mongodb model
const User = require("../models/Users");

// Importing key
const key = process.env.secret;

// Configuring options for jwt token
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

// Exporting passport token
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // Searching db by id
      User.findById(jwt_payload.id)
        .then((user) => {
          // if found
          if (user) {
            return done(null, user);
          }
          // not found
          return done(null, false);
        })
        // Error searching db
        .catch((err) => console.log(err));
    })
  );
};
