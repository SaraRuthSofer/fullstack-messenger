// errorHandler.js

function errorHandler(err, req, res, next) {
    // If response has already been sent, pass to Express
    if (res.headersSent) {
        return next(err);
    }
    // Default status code
    const status = err.status || 500;
    res.status(status).json({
        error: err.message || 'Internal Server Error',
    });
}

module.exports = errorHandler;
