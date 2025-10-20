function logger(req, res, next) {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
}

// export default logger;
module.exports = logger;