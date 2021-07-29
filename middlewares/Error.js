const error = (err, req, res, _next) => {
    if (err.isJoi) {
        return res.status(400).json({
            message: err.details[0].message,
        });
    }

    if (err.isBoom) {
        const { statusCode, payload } = err.output;
        return res.status(statusCode).json({ message: payload.message });
    }
    return res.status(500)
        .json({ message: err.message });
};

module.exports = {
    error,
};