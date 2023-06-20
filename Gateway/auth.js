const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        res.user = user;
        next();
    });
};

const requireRole = role => {
    return (req, res, next) => {
        if(res.user && role.includes(res.user.role)) next();
        else res.status(403).json({message: "Unauthorized access"});
    }
}

module.exports = {authenticateToken, requireRole};