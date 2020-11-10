const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = require('express').Router()

const Users = require('../users/user-model')

const { jwtSecret } = require('./secrets')

router.post('/register', async (req, res) => {
    try {
        const { password } = req.body
        
        const hash = bcrypt.hashSync(password, 10)

        const user = { ...req.body, password: hash }

        const newUser = await Users.add(user)

        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({ message: err.message, stack: err.stack })
    }
})

router.post('/login', (req, res) => {
 
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  }
  const options = {
    expiresIn: '15 seconds'
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;