const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* ============================
   GET PENDING KYC (ADMIN)
============================ */
router.get("/kyc/pending", authMiddleware, async (req, res) => {
    if (!req.isAdmin) {
        return res.status(403).json({ error: "Admin access only" });
    }

    const users = await User.find({ kycStatus: "Pending" })
        .select("name email kycData");

    res.json(users);
});

/* ============================
   APPROVE KYC (ADMIN)
============================ */
router.post("/kyc/approve/:userId", authMiddleware, async (req, res) => {
    if (!req.isAdmin) {
        return res.status(403).json({ error: "Admin access only" });
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    user.kycStatus = "Approved";
    await user.save();

    res.json({ message: "✅ KYC Approved" });
});

module.exports = router;
