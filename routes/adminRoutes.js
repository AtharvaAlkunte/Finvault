const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get(
    "/kyc/pending",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        res.json([]); // your logic here
    }
);

module.exports = router;
