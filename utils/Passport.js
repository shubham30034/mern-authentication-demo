const passport = require("passport");

// Serialize user information into session
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user); // The user object will be stored in the session
});

// Deserialize user information from session
passport.deserializeUser((user, done) => {
  console.log("Deserializing user:", user);
  done(null, user); // The user object will be passed to subsequent routes or middlewares
});


module.exports = passport;
