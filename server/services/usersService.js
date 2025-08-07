const { broadcastToAll } = require('../handlers/websocketHandlers')
const userRepo = require('../repositories/usersRepo')

const getAllUsers = async (filter) => {
    try {
        const users = await userRepo.getAll(filter)
        return users
    }
    catch (error) {
        throw error
    }
}
const createUser = async (user) => {
    try {
        const res = await userRepo.create(user)
        await broadcastToAll(res.toObject(), "new_user")
        return res
    }
    catch (error) {
        throw error
    }
}


module.exports = { getAllUsers, createUser }