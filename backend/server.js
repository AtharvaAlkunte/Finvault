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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ Serve frontend ONCE
app.use(express.static(path.join(__dirname, "public")));

// ✅ Routes
app.use("/auth", require("./routes/auth"));
app.use("/kyc", kycRoutes);
app.use("/admin", require("./routes/admin"));
app.use("/user", require("./routes/user")); // ✅ STAGE 5 LINE

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Protected test
app.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "Access granted",
        userId: req.userId
    });
});



// DB
mongoose.connect(MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

// Root


app.listen(5000, () => {
    console.log("Server running on port 5000");
});
