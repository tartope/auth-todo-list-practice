//to make routes more modular, use 'router' b/c it allows you to break down routes and combine them all together inside the 'index.js' file.
const router = require('express').Router();
//requires pool from db.js file: can run queries with pg
const pool = require("../db");
//requires bcrypt
const bcrypt = require('bcrypt');
//requires jwtGenerator
const jwtGenerator = require('../utils/jwtGenerator');
//requires validinfo file (add to register and login routes below)
const validInfo = require('../middleware/validInfo');
//requires authorization file (add to is-verigy route)
const authorization = require('../middleware/authorization');


//registering:
//'post' to add data (add someone new in db)
router.post('/register', validInfo, async (req, res) => {
    try {
        
        //1. destructure the req.body (name, email, password)
        const { name, email, password } = req.body;

        //2. check if user exists (if user exists then throw error)
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
        // means a user already exists (401 = user is unauthenticated, and 403 = user is unauthorized)
        if(user.rows.length !== 0){
            return res.status(401).send('User already exists');
        }

        //if user does exists, use steps 3, 4 and 5:
        //3. Bcrypt the user password
        //'saltRound' is how encrypted the password will be
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        //this gives an encrypted password
        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. enter the new user inside the db
        const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', [name, email, bcryptPassword]);  //'RETURNING *' returns the data back to us

        // res.json(newUser.rows[0]);
        
        //5. generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//login route:
//'post' to add data (add someone new in db)
router.post('/login', validInfo, async (req, res) => {
    try {
        //1. destructure req.body
        const {email, password} = req.body;

        //2. check if user doesn't exist (if user does not exist throw an error)
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
        
        if(user.rows.length === 0){
            return res.status(401).json('Email does not exist!');
        }

        //3. check if incoming password matches db password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword){
            return res.status(401).json('Password or email is incorrect.')
        }
        
        //4. give jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token })
    }

    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');    }
})

//Authorize the JWT token 
//Checks if token being sent to us is valid
router.get('/is-verify', authorization, async (req, res) => {
    try {
        //If token is valid, return a true statement
        res.json(true);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



module.exports = router;