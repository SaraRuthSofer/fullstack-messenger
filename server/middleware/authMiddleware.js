const { verifyToken, extractTokenFromHeader } = require('../services/jwtService');

/**
 * Middleware to authenticate JWT tokens
 */
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            return res.status(401).json({ 
                error: 'Access denied. No token provided.' 
            });
        }

        const decoded = verifyToken(token);
        req.user = decoded; // Add user info to request object
        next();
    } catch (error) {
        return res.status(403).json({ 
            error: error.message 
        });
    }
};

/**
 * Optional middleware - doesn't fail if token is missing, just sets user if present
 */
const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = extractTokenFromHeader(authHeader);

        if (token) {
            const decoded = verifyToken(token);
            req.user = decoded;
        }
        next();
    } catch (error) {
        // Don't fail, just continue without user info
        next();
    }
};

module.exports = {
    authenticateToken,
    optionalAuth
};
