//Requires JWT Token library
const jwt = require('jsonwebToken')
//Requires secret key
require('dotenv').config()

module.exports = function(req, res, next) {
        //Get token from header
        const token = req.header('token');
        
        //No JWT Token :(
        if(!token){
            return res.status(403).json({msg: 'Not authorized'});
        }

        //Verify token
        try{
            //Verifies the JWT token and the secret key
            const verify = jwt.verify(token, process.env.jwtSecret);

            //If verified, will return payload that we can use in our routes (payload created in 'jwtGenerator.js')
            req.user = verify.user;

            next();
        }        
        catch(err){
            console.error(err.message);
            //Incorrect JWT Token
            return res.status(403).json({msg: 'Not authorized'});
        }
}