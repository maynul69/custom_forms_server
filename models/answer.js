const mongoose = require("mongoose");

const formSubmissionSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true }, // Reference to the form
  responses: {
    type: Map, // Store responses as a key-value object
    of: mongoose.Schema.Types.Mixed, // Values can be string, number, or array
    required: true
  },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FormSubmission", formSubmissionSchema);
