const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication')

const {
    getStudent,
    registerStudent,
    loginStudent,
    logoutStudent
} = require('../controller/student')

router.get('/', authentication, getStudent);
router.post('/signup', registerStudent)
router.post('/login', loginStudent)
router.post('/logout', logoutStudent)

module.exports = router;