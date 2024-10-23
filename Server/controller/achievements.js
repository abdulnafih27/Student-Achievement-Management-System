const { NotFoundError, BadRequestError } = require("../errors");
const Achievements = require("../model/achievements");
const { StatusCodes } = require("http-status-codes");
const Image = require("../model/images");


const getAllAchievements = async (req, res) => {
  try {
    const allAcievements = await Achievements.find({ student: req.user.userId }).sort(
      "createdAt"
    );
    res.status(StatusCodes.OK).json({
      succcess: true,
      Achievements: allAcievements,
      count: allAcievements.length,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ succcess: false, msg: error });
  }
};

const createAchievement = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      throw new BadRequestError(
        "Please Provide Name and Description for the Achievement"
      );
    }
    req.body.student = req.user.userId;
    const achievement = await Achievements.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, achievement });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error });
  }
};

const getAchievement = async (req, res) => {
  const student = req.user.userId;
  const achievementId = req.params.id;
  try {
    const achievement = await Achievements.findOne({ student: student, _id: achievementId });
    if (!achievement) {
      throw new NotFoundError(`There is no Achievement with id : ${achievementId}`);
    }
    res.status(StatusCodes.OK).json({ success: true, achievement });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error });
  }
};


const updateAchievement = async (req, res, error) => {
  try {
    const AchievementId = req.params.id;
    const updates = req.body;
    const student = req.user.userId;
    if (Object.keys(updates).length == 0) {
      throw new BadRequestError("No Updates Provided");
    }
    const Achievement = await Achievements.findOneAndUpdate(
      { _id: AchievementId , student : student},
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!Achievement) {
      throw new NotFoundError(`There is no Achievement with id : ${AchievementId}`);
    }
    res.status(StatusCodes.OK).json({ success: true, Achievement });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error });
  }
};




// Function to add image to a Achievement (works similarly for Internship or Achievement)
const addImageToAchievement = async (req, res, next) => {
  const { id } = req.params;
  const { url } = req.body;
  const student = req.user.userId;

  if (!url) {
    return res
      .status(400)
      .json({ success: false, msg: "Image URL is required." });
  }

  try {
    const Achievement = await Achievements.findOne({_id: id, student : student});
    if (!Achievement) {
      throw new NotFoundError(`No Achievement with id : ${id}`);
    }
    const image = await Image.create({
      url,
      entityType: "Achievement",
      entityId: id,
    });

    Achievement.images.push(image._id);
    await Achievement.save();

    res.status(200).json({ success: true, Achievement, image });
  } catch (error) {
    next(error)
  }
};


const removeImageFromAchievement = async (req, res) => {
    const {id, imageId} = req.params;
    const student = req.user.userId;
  const Achievement = await Achievements.findOneAndUpdate({_id : id , student : student}, {
    $pull: { images: imageId },
  });
  const image = await Image.findByIdAndDelete(imageId);
  res.status(StatusCodes.OK).json({Achievement, image })
};




const deleteAchievement = async (req, res, next) => {
  try {
    const {
      user: { userId },
      params: { id: AchievementId },
    } = req;
    const Achievement = await Achievements.findOneAndDelete({
      _id: AchievementId,
      student: userId,
    });
    if (!Achievement) {
      throw new NotFoundError(`No Achievement with id: ${id}`);
    }
    res.status(StatusCodes.OK).json({ Achievement });
  } catch (error) {
    next(error)
  }
  
};

module.exports = {
  getAllAchievements,
  createAchievement,
  getAchievement,
  updateAchievement,
  deleteAchievement,
  addImageToAchievement,
  removeImageFromAchievement
};
