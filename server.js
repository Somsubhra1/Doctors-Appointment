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
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB connected successfully`))
  .catch((err) => console.log(`Error connecting mongodb ` + err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", require("./routes/auth"));
app.use("/appointments", require("./routes/appointment"));
app.use("/admin", require("./routes/admin"));
app.use("/doctors", require("./routes/doctors"));

// Serve static assets if app is in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
