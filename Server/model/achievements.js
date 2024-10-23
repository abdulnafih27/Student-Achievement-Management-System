const mongoose = require("mongoose");

const AchievementsSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please provide the achievement name"],
      maxlength: [100, "Project name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a achievement description"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    links: {
      type: String,
      validate:
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      required: false,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image", // Reference to Image schema
      },
    ],
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Achievements", AchievementsSchema);
