const clients = new Map()
const {handleChatMessage} = require("./handleChatMessage")
const { extractTokenFromHeader, verifyToken } = require('../services/jwtService');

const WebSocket = require('ws');

const authenticateWebSocketUser = (ws, req) => {
    let token = null;

    // Get token from query parameters
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        token = url.searchParams.get('token');
        console.log("Token from query params:", !!token);
    } catch (error) {
        console.log("Failed to parse URL for token extraction");
    }

    if (!token) {
        console.log("No token found in query parameters");
        ws.close(1008, "Authorization required - token parameter missing");
        return null;
    }

    try {
        const userInfo = verifyToken(token);
        console.log("Authenticated user:", userInfo.username, "ID:", userInfo.userId);
        return userInfo;
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        ws.close(1008, "Invalid token");
        return null;
    }
}

const websocketHandler = (ws, req) => {
    const userInfo = authenticateWebSocketUser(ws, req);

    if (!userInfo) {
        return; // Authentication failed, connection already closed
    }

    const userId = userInfo.userId;

    ws.send(JSON.stringify({ message: "Hi" }))
    clients.set(userId, ws);

    ws.on('message', async (data) => await handleMessage(data, userInfo))
    ws.on('close', () => clients.delete(userId))
}

const handleMessage = async (message, senderInfo) => {
    try {
        const parsedMessage = JSON.parse(message.toString());
        console.log("Received message:", parsedMessage);

        // Handle regular chat messages
        if (parsedMessage.type === 'chat_message') {
            const result = await handleChatMessage(parsedMessage, senderInfo);
            
            if (result) {
                // Send the message to all users in the chat
                await sendMessageToUsers({
                    message: result.message,
                    userIds: result.userIds,
                    messageType: result.messageType
                });
            }
        }

    } catch (error) {
        console.error("Error handling message:", error);
    }
}


// Generic function to send message to multiple users

const sendMessageToUsers = async ({ message, userIds, messageType = "notification" }) => {

    try {
        const messageData = {
            ...message,
            type: messageType,
        };

        console.log(`Sending ${messageType} to ${userIds.length} users`);

        for (const userId of userIds) {
            const userWs = clients.get(userId.toString());
            if (userWs && userWs.readyState === WebSocket.OPEN) {
                userWs.send(JSON.stringify(messageData));
                console.log(`Message sent to user ${userId}`);
            } else {
                console.log(`User ${userId} is not connected`);
            }
        }

    } catch (error) {
        console.error("Error sending message to users:", error);
    }
}

// Send message to all connected users
const broadcastToAll = async (message, messageType = "broadcast") => {
    try {
        const messageData = {
            ...message,
            type: messageType,
        };

        console.log(`Broadcasting ${messageType} to all connected users`);

        for (const [userId, ws] of clients) {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(messageData));
            }
        }

    } catch (error) {
        console.error("Error broadcasting message:", error);
    }
}

module.exports = { 
    websocketHandler, 
    sendMessageToUsers, 
    broadcastToAll 
}



//chat_message

//new_chat / group

//update in chat
//blpck user
