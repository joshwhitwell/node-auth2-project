const router = require('express').Router();

const Users = require('./user-model');
const { restricted } = require('../auth/auth-helpers')

router.get('/', restricted, async (req, res) => {
    const department = req.decodedJWT.department
    try {
        const users = await Users.findBy({ department })
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err.message, stack: err.stack })
    }
})

module.exports = router