const jwt = require("jsonwebtoken")
const secretKey = "TestingPurpose";
const Authentication = (req,res,next) => {
    try {
        const token = req.cookies.Token
        if (!token) return res.status(401).send("You may Need to Login First")
        const data = jwt.verify(token, secretKey)
        req.user = data; 
        // console.log(req.user);
        next()
    } catch (error) {
        res.status(400).send(`Bad Request for Auth ${error}`)
    }
}

module.exports = Authentication;