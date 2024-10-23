const { NotFoundError, BadRequestError } = require("../errors");
const Internships = require("../model/internships");
const { StatusCodes } = require("http-status-codes");
const Image = require("../model/images");

const getAllInternships = async (req, res) => {
  try {
    const allInternships = await Internships.find({ student: req.user.userId }).sort(
      "createdAt"
    );
    res.status(StatusCodes.OK).json({
      succcess: true,
      Internships: allInternships,
      count: allInternships.length,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ succcess: false, msg: error });
  }
};
const createInternship = async (req, res) => {
  try {
    const { company, role } = req.body;
    if (!company || !role) {
      throw new BadRequestError(
        "Please Provide Company and Role for the Internship"
      );
    }
    req.body.student = req.user.userId;
    const Internship = await Internships.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, Internship });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error });
  }
};

const getInternship = async (req, res) => {
  const student = req.user.userId;
  const internshipId = req.params.id;
  try {
    const internship = await Internships.findOne({ student: student, _id: internshipId });
    if (!internship) {
      throw new NotFoundError(`There is no Internship with id : ${internshipId}`);
    }
    res.status(StatusCodes.OK).json({ success: true, internship });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error });
  }
};
const updateInternship = async (req, res, error) => {
  try {
    const InternshipId = req.params.id;
    const updates = req.body;
    const student = req.user.userId;
    if (Object.keys(updates).length == 0) {
      throw new BadRequestError("No Updates Provided");
    }
    const Internship = await Internships.findOneAndUpdate(
      { _id: InternshipId , student : student},
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!Internship) {
      throw new NotFoundError(`There is no Internship with id : ${InternshipId}`);
    }
    res.status(StatusCodes.OK).json({ success: true, Internship });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error });
  }
};

// Function to add image to a Internship (works similarly for Internship or Achievement)
const addImageToInternship = async (req, res, next) => {
  const { id } = req.params;
  const { url } = req.body;
  const student = req.user.userId;
  if (!url) {
    return res
      .status(400)
      .json({ success: false, msg: "Image URL is required." });
  }

  try {
    const Internship = await Internships.findOne({_id : id, student : student});
    if(!Internship){
      throw new NotFoundError(`No Internship with id : ${id}`)
    }
    const image = await Image.create({
      url,
      entityType: "Internship",
      entityId: id,
    });

    Internship.images.push(image._id);
    await Internship.save();

    res.status(200).json({ success: true, Internship, image });
  } catch (error) {
    next(error)
  }
};

const removeImageFromInternship = async (req, res) => {
  const { id, imageId } = req.params;
  const student = req.user.userId;
  const Internship = await Internships.findOneAndUpdate({_id : id, student : student}, {
    $pull: { images: imageId },
  });
  const image = await Image.findByIdAndDelete(imageId);
  res.status(StatusCodes.OK).json({ Internship, image });
};

const deleteInternship = async (req, res, next) => {
  try {
    const {
      user: { userId },
      params: { id: internshipId },
    } = req;
    const internship = await Internships.findOneAndDelete({
      _id: internshipId,
      student: userId,
    });
    if (!internship) {
      throw new NotFoundError(`No Internship with id: ${internshipId}`);
    }
    res.status(StatusCodes.OK).json({ internship });
  } catch (error) {
    next(error)
  }
  
};

module.exports = {
  getAllInternships,
  createInternship,
  getInternship,
  updateInternship,
  deleteInternship,
  addImageToInternship,
  removeImageFromInternship,
};
