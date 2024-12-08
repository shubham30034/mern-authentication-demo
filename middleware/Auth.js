const jwt = require("jsonwebtoken");
require("dotenv").config();

const authUser = async (req, res, next) => {
  try {
    // Get token from cookies
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Token not found. Please log in.",
      });
    }

    // Verify token
    const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET);

    if (!verifiedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please log in again.",
      });
    }

    // Attach user ID to the request
    req.user = verifiedToken.userId;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during authentication.",
    });
  }
};

module.exports = authUser;
