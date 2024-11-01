const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Provide valid Email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

StudentSchema.pre('save', async function (next) {
  if(!this.isModified('password')){
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

StudentSchema.methods.createJWT = function(){
  return jwt.sign({userId : this._id, name : this.name}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_LIFETIME})
}

StudentSchema.methods.comparePassword = async function(password){
  const isMatch = await bcrypt.compare( password, this.password)
  return isMatch;
}


module.exports = mongoose.model('Students', StudentSchema);
