const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./auth-secrets')

const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.status(401).json({ message: 'Access denied: no token' })
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Access denied: invalid token' })
            } else {
                req.decodedJWT = decoded
                next()
            }
        })
    }
}

module.exports = {
    restricted
}