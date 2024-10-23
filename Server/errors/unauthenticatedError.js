const CustomAPIError = require("./CustomError");
const { StatusCodes } = require("http-status-codes");

class unauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = unauthenticatedError;
