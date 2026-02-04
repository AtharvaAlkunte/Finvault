const token = jwt.sign(
    {
        userId: user._id,
        role: user.role   // ✅ THIS MUST BE PRESENT
    },
    JWT_SECRET,
    { expiresIn: "1d" }
);
