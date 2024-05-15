const Jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No autorizado" });
    }
    Jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "No autorizado" });
        }
        req.user = user;
        next();
    });
};

module.exports = { verifyToken };