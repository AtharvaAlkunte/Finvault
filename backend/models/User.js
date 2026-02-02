const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,

    email: {
        type: String,
        unique: true,
        required:true,
        lowercase:true,
        trim:true
        
    },

    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },

    kycStatus: {
        type: String,
       enum: ["Not Submitted", "Pending", "Approved", "Rejected"],
        default: "Not Submitted"
    },
    kycData:{
        fullName:String,
        dob:String,
        panNumber:String,
        aadhaarNumber:String
    }

    
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
