require('dotenv').config();
const { WebSocketServer } = require('ws')
const express = require('express')
const cors = require('cors')
const http = require('http');

const authRouter = require('./routes/authRouter')
const chatsRouter = require('./routes/chatsRouter')
const usersRouter = require('./routes/usersRouter')
const messagesRouter = require('./routes/messagesRouter')
const errorHandler = require('./middleware/errorHandler')

const { websocketHandler } = require('./handlers/websocketHandlers');
const connectDB = require('./configs/db');


const PORT = 3000;
const app = express()
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);
    console.log(`WebSocket available at ws://localhost:${PORT}`);
});

const wsServer = new WebSocketServer({ server });

wsServer.on('connection', (ws, req) => {
    websocketHandler(ws, req)
})

connectDB()

app.use(cors())
app.use(express.json());
app.use(errorHandler)

app.use('/auth', authRouter);
app.use('/chats', chatsRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);