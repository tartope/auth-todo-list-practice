//allows access to all environment variables
const jwt = require('jsonwebtoken');
require('dotenv').config();


function jwtGenerator(user_id){
    const payload = {
        user: {
            id: user_id
        }
    }

    //sign the token (takes in payload, secret, and expiration date (without expiration date a person can enter the app an unlimited amount of times which makes it vulunerable to hacking; the expiration date is represented in seconds: so one hour = '60 * 60', or '1hr'))
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: '1hr'})
}

module.exports = jwtGenerator;