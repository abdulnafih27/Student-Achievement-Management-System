const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students", // Reference to the student schema
      required: true,
    },
    company: {
      type: String,
      required: [true, "Please provide the company name"],
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    role: {
      type: String,
      required: [true, "Please provide the role/title"],
      maxlength: [100, "Role cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description of the internship"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image", // Reference to Image schema
      },
    ],
    duration: {
      type: String, // Duration of the internship, e.g., "3 months"
      required: [true, "Please provide the duration of the internship"],
    },
    status: {
      type: String,
      enum: ["completed", "ongoing"], // Enum for internship status options
      default: "ongoing", // Default status
    },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Internship", InternshipSchema);
