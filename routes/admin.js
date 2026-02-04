const express = require("express");
const router = express.Router();
const Kyc = require("../models/Kyc");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

/* =========================
   GET ALL PENDING KYC
========================= */
router.get("/kyc/pending", authMiddleware, isAdmin, async (req, res) => {
  try {
    const kycs = await Kyc.find({ status: "PENDING" });
    res.json(kycs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   APPROVE KYC
========================= */
router.put("/kyc/:id/approve", authMiddleware, isAdmin, async (req, res) => {
  try {
    const kyc = await Kyc.findById(req.params.id);

    if (!kyc) {
      return res.status(404).json({ message: "KYC not found" });
    }

    kyc.status = "APPROVED";
    await kyc.save();

    res.json({ message: "KYC approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
