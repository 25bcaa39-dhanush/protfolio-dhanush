require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔍 Debug: check env
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded ✅" : "NOT FOUND ❌");

// 🔥 Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
    console.log("MongoDB Atlas Connected 🚀");
})
.catch((err) => {
    console.error("Connection Error ❌:", err);
});

// Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Model
const Contact = mongoose.model("Contact", contactSchema);

// Route
app.post("/contact", async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);

        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newContact = new Contact({ name, email, message });

        await newContact.save();

        console.log("Saved to MongoDB ✅");

        res.json({
            success: true,
            message: "Message Sent Successfully 🚀"
        });

    } catch (error) {
        console.error("FULL ERROR ❌:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});

// Test route
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});