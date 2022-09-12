/**
 * Name: check-auth.js
 * Description: Check authentication middleware.
 */
const checkAuthStatus = (req, res, next) => {
    const uid = req.session.uid;

    // Check uid exists or not
    if(!uid) {
        return next();
    }

    res.locals.uid = uid;
    res.locals.isAuth = true;
    next();
}

module.exports = checkAuthStatus;