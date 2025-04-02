const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired." });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }

    // Other unforeseen JWT errors
    return res.status(403).json({ message: "Token verification failed." });
  }
};

module.exports = verifyToken;
