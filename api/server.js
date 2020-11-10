const express = require('express')

const authRouter = require('../auth/auth-router')

const server = express()

server.use(express.json())

server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.json({ API: 'UP' })
})

module.exports = server