const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is mandatory
  },
  email: {
    type: String,
    required: true, // Email is also mandatory
    unique: true,   // Ensures no duplicate emails in the database
  },
  // Password field for local login
  passwordHash: {
    type: String,
    required: function () {
      return this.authMethod === 'local'; // Only required for local login
    },
  },
  // Fields for Google login
  googleId: {
    type: String,
    required: function () {
      return this.authMethod === 'google'; // Only required for Google login
    },
  },
  googleTokens: {
    accessToken: { type: String },
    refreshToken: { type: String },
    expiryDate: { type: Date },
  },
  // Fields for Facebook login
  facebookId: {
    type: String,
    required: function () {
      return this.authMethod === 'facebook'; // Only required for Facebook login
    },
  },
  facebookTokens: {
    accessToken: { type: String },
    refreshToken: { type: String },
    expiryDate: { type: Date },
  },
  // Field to differentiate between login methods
  authMethod: {
    type: String,
    enum: ['local', 'google', 'facebook'], // Possible login methods
    required: true,
  }
});

// Export the User model
module.exports = mongoose.model("User", userSchema);
