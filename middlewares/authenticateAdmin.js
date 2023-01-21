const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Admin Authentication and authorization middleware
 * @return function next()
 */
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ error: "You don't have authorization to access this route" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Invalid TOKEN! Login to get new one" });
    }

    if (user.role !== "admin") {
      return res.status(401).json({
        error: "You don't have Admin authorization to access this route",
      });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateAdmin;
