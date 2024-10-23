const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "Please provide the image URL"],
  },
  entityType: {
    type: String,
    enum: ["Projects", "Internship", "Achievement"],
    required: [
      true,
      "Please provide the entity type (Project, Internship, Achievement)",
    ],
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide the associated entity ID"],
    refPath: "entityType", // Dynamic reference to the related schema (Project, Internship, Achievement)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Image", ImageSchema);
