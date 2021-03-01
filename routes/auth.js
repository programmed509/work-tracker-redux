const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('x-auth-token');

    if(token.length === 0){
        res.status(401).json({msg: 'No token, Authorisation denied'})
    }

    try{
        const decoded = jwt.verify(token,'secret');
        req.user = decoded.user
        next();
    }
    catch(error){
        console.log(error)
        res.status(500).json({msg: 'Please enter Login details'});
    }
}