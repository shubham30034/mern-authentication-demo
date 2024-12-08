const express = require("express");
const route = express.Router();
const passport = require("../utils/Passport");

// Example controller for handling user data
const loginGoogle = require("../controller/User");

// Route to test server
route.get("/", (req, res) => {
    res.send("hello");
});

// Route for Google authentication
route.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
);

// Route for Google OAuth callback
route.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login-failed' }),
    async (req, res) => {
        try {
            const user = req.user; // Passport attaches user information to req.user
            return res.status(200).json({
                success: true,
                message: "User authenticated successfully",
                data: user
            });
            
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Error logging in"
            });
        }
    }
);

// Route for login failure
route.get("/login-failed", (req, res) => {
    return res.status(500).json({
        success: false,
        message: "Login failed"
    });
});

module.exports = route;
