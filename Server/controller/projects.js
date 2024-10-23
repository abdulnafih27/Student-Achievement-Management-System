const { NotFoundError, BadRequestError } = require("../errors");
const Projects = require("../model/projects");
const { StatusCodes } = require("http-status-codes");
const Image = require("../model/images");



const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Projects.find({ student: req.user.userId }).sort(
      "createdAt"
    );
    res
      .status(StatusCodes.OK)
      .json({
        succcess: true,
        Projects: allProjects,
        count: allProjects.length,
      });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error });
  }
};
const createProject = async (req, res) => {
  try {
    const {name, description} = req.body;
    if(!name || !description){
      throw new BadRequestError('Please Provide Name and Description for the project')
    }
    req.body.student = req.user.userId;
    const project = await Projects.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, project });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error });
  }
};

const getProject = async (req, res) => {
  const student = req.user.userId;
  const projectId = req.params.id;
  try {
    const project = await Projects.findOne({ student: student, _id: projectId });
    if (!project) {
      throw new NotFoundError(`There is no Project with id : ${projectId}`);
    }
    res.status(StatusCodes.OK).json({ success: true, project });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error });
  }
};

const getProjectImages = async (req, res, next) => {
  try {
    const { id, imageId } = req.params;
    const image = await Image.findOne({ entityId : id, _id: imageId});
    // console.log(image)
    res.status(StatusCodes.OK).json({success : true, data : image})
  } catch (error) {
   next(error); 
  }
}

const updateProject = async (req, res, error) => {
    try {
        const projectId = req.params.id;
        const updates = req.body;
        const student = req.user.userId;
        if (Object.keys(updates).length == 0) {
          throw new BadRequestError("No Updates Provided");
        }
        const project = await Projects.findOneAndUpdate(
          { _id: projectId , student : student},
          updates,
          {
            new: true,
            runValidators: true,
          }
        );

        if(!project){
           throw new NotFoundError(
             `There is no Project with id : ${projectId}`
           ); 
        }
        res.status(StatusCodes.OK).json({success : true, project})
    } catch (error) {
       res
         .status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({ success: false, msg: error });
    }
};





// Function to add image to a project (works similarly for Internship or Achievement)
const addImageToProject = async (req, res, next) => {
  const { id } = req.params;
  const { url } = req.body;
  const student = req.user.userId
  if (!url) {
    throw new BadRequestError("Image URL is required");
  }

  try {
    const project = await Projects.findOne({_id : id, student : student});
    if(!project){
      throw new NotFoundError(`No Project with id : ${id}`)
    }
    const image = await Image.create({
      url,
      entityType: "Projects",
      entityId: id,
    });

    project.images.push(image._id);
    await project.save();

    res.status(200).json({ success: true, project, image });
  } catch (error) {
    next(error)
  }
};


const removeImageFromProject = async (req, res) => {
    const {id, imageId} = req.params;
    const student = req.user.userId;
  const project = await Projects.findOneAndUpdate({_id : id, student : student}, {
    $pull: { images: imageId },
  });
  const image = await Image.findByIdAndDelete(imageId);
  res.status(StatusCodes.OK).json({project, image })
};




const deleteProject = async (req, res, next) => {
  try {
    const {
      user: { userId },
      params: { id: projectId },
    } = req;
    const project = await Projects.findOneAndDelete({
      _id: projectId,
      student: userId,
    });
    if (!project) {
      throw new NotFoundError(`No Project with id: ${id}`);
    }
    res.status(StatusCodes.OK).json({ project });
  } catch (error) {
    next(error)
  }
  
};

module.exports = {
  getAllProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  addImageToProject,
  removeImageFromProject,
  getProjectImages
};
