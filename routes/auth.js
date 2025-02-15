const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Load secret key from .env (Ensure you have a SECRET_KEY in your .env file)
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        res.status(200).send({ message: "Login successful", token });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
});

module.exports = router;
