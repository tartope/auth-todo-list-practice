module.exports = (req, res, next) => {
    const { email, name, password } = req.body;

    //Checks whether, or not, the email is valid (whether email follows regex pattern)
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    //Checks that there are no empty value
    if (req.path === "/register") {
        //Loops through array to determine if values are empty; if empty then return res.json
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
            //If all values (email, name, password) are there, checks to see if email is valid
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path === "/login") {
        //Loops through array to determine if values are empty; if empty then return res.json
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
            //If all values (email, password) are there, checks to see if email is valid or not
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }

    //When everything is complete/okay, it continues with the route
    next();
};