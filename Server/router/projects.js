const express = require('express');
const router = express.Router();
const multer = require('multer')

const {
    getAllProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject,
    addImageToProject,
    removeImageFromProject,
    getProjectImages
} = require('../controller/projects');


const upload = require('../middleware/multer')

router.post('/', createProject)
router.get('/', getAllProjects )
router.get('/:id', getProject)
router.patch('/:id', updateProject)
router.delete('/:id', deleteProject)
router.post("/:id/images", upload.single('file') ,addImageToProject);
router.get("/:id/images",getProjectImages);
router.delete("/:id/images/:imageId", removeImageFromProject);



module.exports = router;