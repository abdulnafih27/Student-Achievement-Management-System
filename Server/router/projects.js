const express = require('express');
const router = express.Router();

const {
    getAllProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject,
    addImageToProject,
    removeImageFromProject,
    getProjectImages,
} = require('../controller/projects')

router.post('/', createProject)
router.get('/', getAllProjects )
router.get('/:id', getProject)
router.patch('/:id', updateProject)
router.delete('/:id', deleteProject)
router.post("/:id/images", addImageToProject);
router.get("/:id/images/:imageId", getProjectImages)
router.delete("/:id/images/:imageId", removeImageFromProject);


module.exports = router;