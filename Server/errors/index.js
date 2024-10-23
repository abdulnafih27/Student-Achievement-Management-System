const BadRequestError = require('./BadRequest');
const unauthenticated = require('./unauthenticatedError')
const NotFoundError = require('./notFoundError');
const CustomAPIError = require('./CustomError');

module.exports = { 
    BadRequestError,
    unauthenticated,
    NotFoundError,
    CustomAPIError
}
