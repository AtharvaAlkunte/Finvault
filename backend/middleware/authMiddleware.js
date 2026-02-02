const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No or invalid token" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;
        req.userRole = decoded.role;
        req.isAdmin = decoded.role === "admin";


        console.log("ROLE FROM TOKEN:", req.userRole);

        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = authMiddleware;
