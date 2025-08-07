const Chat = require('../models/chatModel');
const BaseRepo = require('./baseRepo');

class ChatRepo extends BaseRepo {
    constructor() {
        super(Chat);
    }
}

module.exports = new ChatRepo();
