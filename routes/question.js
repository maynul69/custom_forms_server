
// controllers/questionController.js
const express = require("express");
const router = express.Router();
const Question = require("../models/question");

router.post("/questions", async (req, res) => {
    try {
        console.log("Received data:", req.body);

        // Ensure the data contains the required fields (title, description, and questions array)
        if (!req.body.title || !req.body.questions || !Array.isArray(req.body.questions)) {
            return res.status(400).json({ error: "Missing required fields: title or questions." });
        }

        // Extract form data (title, description, and questions)
        const { title, description, token, questions } = req.body;

        // Create a new Question collection document with the data
        const questionCollectionData = {
            title,                // Form title
            description,          // Form description (optional)
            token: token,  // You can generate or pass a custom token
            questions            // Array of questions
        };

        // Create a new question collection document
        const questionCollection = new Question(questionCollectionData);

        // Save the question collection document to the database
        const savedQuestions = await questionCollection.save();

        // Respond with the saved questions data
        res.status(201).json({ message: "Questions saved successfully", data: savedQuestions });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// Get all questions
router.get("/questions", async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/questions/email", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required." });
        }

        // Find all questions where the token matches the provided email
        const questions = await Question.find({ token: email });

        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found for this email." });
        }

        res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching questions by email:", error);
        res.status(500).json({ error: "Failed to fetch questions." });
    }
});

// Get a single question by ID
router.get("/questions/:id", async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ error: "Question not found" });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a question
router.put("/questions/:id", async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) return res.status(404).json({ error: "Question not found" });
        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a question
router.delete("/questions/:id", async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ error: "Question not found" });
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
