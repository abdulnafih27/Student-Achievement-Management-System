const mongoose = require("mongoose");

// Define the Marks schema
const MarksSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
    semester: {
      type: String,
      enum: [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
        "Semester 8",
      ],
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    internalMarks: {
      type: Number,
      required: true,
      min: 0,
    },
    externalMarks: {
      type: Number,
      required: true,
      min: 0,
    },
    totalMarks: {
      type: Number,
    },
    maxMark: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

MarksSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  // If either internalMarks or externalMarks is being updated
  if (
    update.internalMarks !== undefined ||
    update.externalMarks !== undefined
  ) {
    // Find the current document
    this.model
      .findOne(this.getQuery())
      .then((doc) => {
        // Calculate new totalMarks using updated values or existing values
        const newInternalMarks =
          update.internalMarks !== undefined
            ? update.internalMarks
            : doc.internalMarks;
        const newExternalMarks =
          update.externalMarks !== undefined
            ? update.externalMarks
            : doc.externalMarks;
        const newTotalMarks = newInternalMarks + newExternalMarks;

        // Check if total exceeds maxMark
        if (newTotalMarks > doc.maxMark) {
          next(
            new Error(
              `Total marks (${newTotalMarks}) cannot exceed maximum marks (${doc.maxMark})`
            )
          );
          return;
        }

        // Set the new totalMarks in the update
        this.setUpdate({
          ...update,
          totalMarks: newTotalMarks,
        });
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});


module.exports = mongoose.model("Marks", MarksSchema);
