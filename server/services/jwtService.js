const jwt = require('jsonwebtoken');

// Secret key for JWT signing (in production, use environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Create a JWT token with user ID and username
 * @param {Object} payload - The payload to include in the token
 * @param {string} payload.userId - User ID
 * @param {string} payload.username - Username
 * @returns {string} JWT token
 */
const createToken = (payload) => {
    try {
        const token = jwt.sign(
            {
                userId: payload.userId,
                username: payload.username,
                iat: Math.floor(Date.now() / 1000), // issued at time
            },
            JWT_SECRET,
            {
                expiresIn: JWT_EXPIRES_IN,
                issuer: 'fullstack-messenger',
                audience: 'messenger-users'
            }
        );
        return token;
    } catch (error) {
        throw new Error('Failed to create token: ' + error.message);
    }
};

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET, {
            issuer: 'fullstack-messenger',
            audience: 'messenger-users'
        });
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        } else if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token');
        } else {
            throw new Error('Token verification failed: ' + error.message);
        }
    }
};

/**
 * Extract token from Authorization header
 * @param {string} authHeader - Authorization header value
 * @returns {string|null} Token or null if not found
 */
const extractTokenFromHeader = (authHeader) => {
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7); // Remove 'Bearer ' prefix
    }
    return null;
};

module.exports = {
    createToken,
    verifyToken,
    extractTokenFromHeader
};
