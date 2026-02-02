const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Kyc = require("../models/Kyc"); // 1. Import the Kyc model
const authMiddleware = require("../middleware/authMiddleware");

/* =========================
   USER: Submit KYC
========================= */
router.post("/submit", authMiddleware, async (req, res) => {
    try {
        const { fullName, dob, panNumber, aadhaarNumber } = req.body;

        if (!fullName || !dob || !panNumber || !aadhaarNumber) {
            return res.status(400).json({ error: "All fields required" });
        }

        // 2. Create or Update the document in the 'kycs' collection
        const kycData = await Kyc.findOneAndUpdate(
            { userId: req.userId }, 
            { 
                fullName, 
                dob, 
                panNumber, 
                aadhaarNumber, 
                status: "PENDING" 
            },
            { upsert: true, new: true }
        );

        // 3. Update the kycStatus in the User collection for easy reference
        await User.findByIdAndUpdate(req.userId, { kycStatus: "Pending" });

        res.json({ message: "KYC submitted successfully", kycData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

/* =========================
   ADMIN: Approve KYC (Fixed ID bug)
========================= */
router.post("/approve/:userId", authMiddleware, async (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ error: "Admin only" });

    // Update User Status
    await User.findByIdAndUpdate(req.params.userId, { kycStatus: "Approved" });
    
    // Update KYC Record Status
    await Kyc.findOneAndUpdate({ userId: req.params.userId }, { status: "APPROVED" });

    res.json({ message: "KYC approved" });
});

module.exports = router;