const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique:true 
  },
   fullName: String,
  dob: String,
  panNumber: String,
  aadhaarNumber: String,
  status: {
    type: String,
    enum: ["NOT_SUBMITTED", "PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Kyc", kycSchema);
