const Message = require('../models/messageModel')
const BaseRepo = require('./baseRepo');
class MessageRepo extends BaseRepo {
    constructor() {
        super(Message);
    }
}

module.exports = new MessageRepo();
