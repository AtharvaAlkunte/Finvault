console.log("✅ admin.js routes file loaded");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isadmin");
const Kyc = require("../models/Kyc");

router.put(
  "/kyc/approve/:id",
  authMiddleware,
  isAdmin,
  async (req, res) => {
    try {
      const kyc = await Kyc.findById(req.params.id);

      if (!kyc) {
        return res.status(404).json({ message: "KYC not found" });
      }

      kyc.status = "APPROVED";
      await kyc.save();

      res.json({ message: "KYC approved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
