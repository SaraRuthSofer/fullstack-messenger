const BaseRepo = require('./baseRepo');
const User = require('../models/userModel');

class UsersRepo extends BaseRepo {
    constructor() {
        super(User);
    }
}

module.exports = new UsersRepo();
