const express = require("express");
const router = express.Router();

const {
  getAllInternships,
  createInternship,
  getInternship,
  updateInternship,
  deleteInternship,
  addImageToInternship,
  removeImageFromInternship,
} = require("../controller/internships");

router.post("/", createInternship);
router.get("/", getAllInternships);
router.get("/:id", getInternship);
router.patch("/:id", updateInternship);
router.delete("/:id", deleteInternship);
router.post("/:id/images", addImageToInternship);
router.delete("/:id/images/:imageId", removeImageFromInternship);

module.exports = router;
