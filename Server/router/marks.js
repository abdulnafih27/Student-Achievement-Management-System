const express = require('express');
const router = express.Router();
const {
    addSubject,
    getSubject,
    getSemSubjects,
    editMarks,
    deleteSubject
} = require('../controller/marks')

router.post('/', addSubject);
router.get('/subject/:id', getSubject)
router.get('/semester/:sem', getSemSubjects);
router.patch('/:id', editMarks);
router.delete('/:id', deleteSubject);

module.exports = router;