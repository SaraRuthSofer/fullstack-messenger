const express = require('express')
const service = require('../services/usersService')
const jwt = require('../services/jwtService')


const router = express.Router()


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const users = await service.getAllUsers({ email, password })
    const user = users[0]
    if (user) {
        const token = jwt.createToken({
            userId: user._id,
            username: user.name
        });
        res.json({ _id: user._id, name: user.name, token: token })
    }
    else
        res.status(401).json({ error: "User doesn't exist" })
})
router.post('/register', async (req, res) => {
    const userData = req.body
    const user = await service.createUser(userData)
    if (user) {
        const token = jwt.createToken({
            userId: user._id,
            username: user.name
        });
        res.json({ _id: user._id, name: user.name, token: token })
    }
})


module.exports = router