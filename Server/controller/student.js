const Students = require("../model/student");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, unauthenticated } = require("../errors");


const getStudent = async (req, res) => {
  try {
    const {userId} = req.user;
    const student = await Students.findOne({_id : userId});
    res.status(StatusCodes.OK).json({name : student.name, email : student.email})
  } catch (error) {
    next(error);
  }
}

const registerStudent = async (req, res) => {
  try {
    const {email, name, password} = req.body;
    const student = await Students.create({ email : email.toLowerCase(),name, password });
    const token = student.createJWT();
    res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: { name: student.name, token: token } });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, msg: error });
  }
};
const loginStudent = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Please Provide Email and Password");
    }

    const student = await Students.findOne({ email: email.toLowerCase() });
    if (!student) {
      throw new unauthenticated("Invalid Credentials");
    }

    const isPassword = await student.comparePassword(password);
    if (!isPassword) {
      throw new unauthenticated("Invalid Credentials");
    }

    const token = student.createJWT();
    res
      .status(StatusCodes.OK)
      .json({ success: true, data: { name: student.name, token: token } });
  } catch (error) {
    next(error);
  }
};
const logoutStudent = async (req, res) => {
  res.send("logout User");
};

module.exports = {
  getStudent,
  registerStudent,
  loginStudent,
  logoutStudent,
};
