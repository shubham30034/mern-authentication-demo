const express = require("express");
const cors = require("cors");
const session = require("express-session"); // Import express-session
const userRoute = require("./route/User");
const passport = require("./utils/Passport"); // Your Passport configuration
const { GoogleProvider } = require("./utils/GoogalStregy");

const app = express();

// Middleware setup
app.use(express.json());


app.use(cors());


// Configure express-session
app.use(
  session({
    secret: "hehehe", // Replace with a strong secret key
    resave: false, // Prevents session being saved back to the store if unmodified
    saveUninitialized: false, // Do not save uninitialized sessions
  })
);
app.use("/api/v1", userRoute); // Mount user routes under /api/v1
// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.use(GoogleProvider); // Use Google strategy
// Routes

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
