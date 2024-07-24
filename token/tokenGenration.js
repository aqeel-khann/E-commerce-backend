const jwt = require("jsonwebtoken")
const secretKey="TestingPurpose"
const tokenGenration = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email:user.email
    }
     
    const token = jwt.sign(payload, secretKey,{expiresIn:'1h'})
    
    return token;
    
}

module.exports={tokenGenration}