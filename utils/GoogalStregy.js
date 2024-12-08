const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport = require("./Passport")


require('dotenv').config();


exports.GoogleProvider = new GoogleStrategy(  {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:process.env.CALLBACK_URL,
},   (accessToken, refreshToken, profile, cb) => {
  // Process user profile
  console.log("Google Profile:", profile);
    cb(null, profile); // Pass profile to the next middleware
}
);