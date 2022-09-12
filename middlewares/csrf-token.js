const addCsrfToken = (req, res, next) => {
    // generate csrf token
    res.locals.csrfToken = req.csrfToken();
    // when generation completed req move to next middleware / handler
    next();
}

module.exports = addCsrfToken;