const Marks = require('../model/marks');
const {StatusCodes} = require('http-status-codes');
const { NotFoundError, BadRequestError } = require("../errors");

const addSubject = async (req, res) => {
    try {
        req.body.student = req.user.userId;
        const subject = await Marks.create({...req.body})
        res.status(StatusCodes.CREATED).json({success : true, data : subject})
    } catch (error) {
        next(error)
    }
}

const getSubject = async (req, res, next) => {
    try {
        const subId = req.params.id;
        const subject = await Marks.findById({_id :subId});
        if(!subject){
            throw new NotFoundError(`There is No subject with id : ${subId}`)
        }
        res.status(StatusCodes.OK).json({success : true, subject : subject});
    } catch (error) {
        next(error)
    }
}


const getSemSubjects = async (req, res, next) => {
    try {
        const sem = req.params.sem;
        const subjects = await Marks.find({student : req.user.userId , semester : sem}).sort("subjectName");
        if(subjects.length == 0){
            throw new NotFoundError('No Subjects in this Semester, Add new Subject...')
        }
        res.status(StatusCodes.OK).json({success : true, subjects : subjects, count : subjects.length})
    } catch (error) {
        next(error);
    }
}
const editMarks = async (req, res, next) => {
    try {
        const subId  = req.params.id;
        const updates = req.body;
        const subject = await Marks.findOneAndUpdate({_id : subId}, updates, {
            new : true,
            runValidators : true
        });
        if(!subject){
            throw new NotFoundError(`There is no Subject with id : ${subId}`)
        }
        res.status(StatusCodes.OK).json({success : true, subject : subject})
    } catch (error) {
        next(error)
    }
}

const deleteSubject = async(req, res, next) => {
    try {
        const {
          user: { userId },
          params: { id: subjectId },
        } = req;
        const subject = await Marks.findOneAndDelete({
          _id: subjectId,
          student: userId,
        });
        if (!subject) {
          throw new NotFoundError(`No Project with id: ${subjectId}`);
        }
        res.status(StatusCodes.OK).json({ subject });
    } catch (error) {
        next(error)
    }
}




module.exports = {
    addSubject,
    getSubject,
    getSemSubjects,
    editMarks,
    deleteSubject
}