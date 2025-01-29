// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Option A: Token from 'Authorization' header: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
    const token = authHeader.split(" ")[1]; // remove "Bearer "

    // Option B: Token from a Cookie
    // const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
      }
      // Attach decoded user data to req
      req.user = decoded;
      // proceed to next middleware
      next();
    });
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
