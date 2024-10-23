const jwt = require('jsonwebtoken');
const { unauthenticated } = require('../errors');

const auth = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new unauthenticated('Authentication Invalid');
        }
    
        const token = authHeader.split(' ')[1];
        try {
            const payload = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = {userId : payload.userId, name : payload.name}
            next();
        } catch (error) {
            throw new unauthenticated("Authenticaiton Invalid");
        }
    } 
    catch (error){
        next(error);
    }
}

module.exports = auth;