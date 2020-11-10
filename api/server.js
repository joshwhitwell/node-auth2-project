const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../database/db-config')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.json({ API: 'UP' })
})

module.exports = server