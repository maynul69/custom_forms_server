const express = require("express");
const mongoose = require("mongoose");
const FormSubmission = require("../models/answer");
const Question = require('../models/question')
const router = express.Router();

// ✅ POST: Submit Form Responses
router.post("/submit", async (req, res) => {
  try {
    const { formId, responses } = req.body;

    if (!formId || !responses || responses.length === 0) {
      return res.status(400).json({ error: "Invalid form submission" });
    }

    const newSubmission = new FormSubmission({
      formId,
      responses,
    });
    console.log(newSubmission);
    

    await newSubmission.save();
    res.status(201).json({ message: "Form submitted successfully!", submission: newSubmission });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Failed to submit form" });
  }
});
// ✅ GET: Fetch a specific submission with the expanded formId (Question data)
router.get("/submissions/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      console.log("Fetching submission for form submission ID:", id);
  
      // Populate formId with the associated question data
      const submission = await FormSubmission.findById(id)
        .populate("formId") // Populate formId field with question data
        .exec();
  
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }
  
      console.log("Form submission data with populated question:", submission);
  
      // Return the populated submission data along with the question details
      res.status(200).json(submission);
    } catch (error) {
      console.error("Error fetching submission:", error);
      res.status(500).json({ error: "Failed to fetch submission" });
    }
  });

router.get("/all-form", async(req,res)=>{
    try{
        const allForm = await FormSubmission.find() .populate("formId") // Populate formId field with question data
        .exec();
  ;
        return res.status(200).json({
            res: allForm,
            message: "here is all fomr"
        })
    }catch(err){
        return res.send(err.message)
    }
  })
module.exports = router;
