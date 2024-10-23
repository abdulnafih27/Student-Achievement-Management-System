const express = require('express');
const router = express.Router();

const {
    getAllAchievements,
    createAchievement,
    getAchievement,
    updateAchievement,
    deleteAchievement,
    addImageToAchievement,
    removeImageFromAchievement
} = require('../controller/achievements')

router.post('/', createAchievement)
router.get('/', getAllAchievements )
router.get('/:id', getAchievement)
router.patch('/:id', updateAchievement)
router.delete('/:id', deleteAchievement)
router.post("/:id/images", addImageToAchievement);
router.delete("/:id/images/:imageId", removeImageFromAchievement);


module.exports = router;