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

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await Users.findBy({ username }).first()
        console.log(user)
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)
            res.status(200).json({ message: `Welcome ${user.username}`, token })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message, stack: err.stack })
    }
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: 60 * 30
    }
    return jwt.sign(payload, jwtSecret, options)
}

module.exports = router