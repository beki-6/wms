const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if(err) return res.sendStatus(403);
        res.user = user;
        next();
    });
};

const requireRole = role => {
    return (req, res, next) => {
        if(res.user && res.user.role === role) next();
        else res.status(403).json({message: "Unauthorized access"});
    }
}

function generateToken(user){
    return jwt.sign(
        {id: user._id, username: user.username, role: user.role},
        process.env.TOKEN_KEY,
        {expiresIn: '1h'}
    );
  }

module.exports = {authenticateToken, requireRole, generateToken};