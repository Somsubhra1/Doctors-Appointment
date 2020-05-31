const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
require("dotenv/config");

const db = process.env.mongoURI;

const app = express();

app.use(cors());

// Passport middleware
app.use(passport.initialize());

// Config for JWT strategy
require("./middlewares/jsonwtstrategy")(passport);

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`MongoDB connected successfully`))
  .catch((err) => console.log(`Error connecting mongodb ` + err));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", require("./routes/auth"));
app.use("/appointments", require("./routes/appointment"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
