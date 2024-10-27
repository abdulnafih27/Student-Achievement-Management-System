const Image = require('../model/images')
const getAllImages = async (req, res, next) => {
 try {
    const images = await Image.find({});
    res.status(200).json({images : images, count : images.length})
 } catch (error) {
    next(error)
 }   
}

module.exports = {getAllImages}