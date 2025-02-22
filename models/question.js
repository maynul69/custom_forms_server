const mongoose = require("mongoose");

// Question Schema
const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },  // Custom field for each question
  questionText: { type: String, required: true },
  questionType: { type: String, enum: ["text", "paragraph", "number", "checkbox", "radio"], required: true },
  options: { type: [String], default: [] },
  required: { type: Boolean, default: false },
  selectedOption: { type: String, default: null },
  image: { type: String, default: "" },
  answer: { type: String, default: "" }
});

// Question Collection Schema (Form schema)
const questionCollectionSchema = new mongoose.Schema({
  title: { type: String, required: true },   // Form title
  description: { type: String, required: false },   // Form description
  token: { type: String, required: true },  // Form identifier
  questions: { type: [questionSchema], required: true }
}, { timestamps: true });

const Question = mongoose.model("Question", questionCollectionSchema);
module.exports = Question;
