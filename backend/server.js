const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const { MONGO_URI } = require("./config");
const authMiddleware = require("./middleware/authMiddleware");
const kycRoutes = require("./routes/kyc");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   SERVE FRONTEND
========================= */
app.use(express.static(path.join(__dirname, "public")));

/* =========================
   ROUTES
========================= */
app.use("/auth", require("./routes/auth"));
app.use("/kyc", kycRoutes);
app.use("/admin", require("./routes/admin"));
app.use("/user", require("./routes/user"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* =========================
   PROTECTED TEST ROUTE
========================= */
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    userId: req.userId,
  });
});

/* =========================
   DATABASE CONNECTION
========================= */
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ DB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

/* =========================
   SERVER START (IMPORTANT)
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
