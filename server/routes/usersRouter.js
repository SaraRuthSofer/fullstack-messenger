const express = require('express')
const service = require('../services/usersService')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const users = await service.getAllUsers()
        res.json(users)
    }
    catch (error) { next(error) }
})

module.exports = router