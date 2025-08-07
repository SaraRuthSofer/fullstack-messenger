const mongoose = require('mongoose')

const CONNECTION_STRING = 'mongodb://localhost:27017/messenger-db'

const connectDB = () => mongoose.connect((CONNECTION_STRING))
    .then(() => {
        console.log('Connected to MongoDB successfully')
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    })

module.exports = connectDB