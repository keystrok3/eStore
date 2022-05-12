
// checks if current user has the role of 'admin'
// and passes control over to the controller function 
// otherwise returns 'Unauthorised'.
const isAdmin = function(req, res, next) {
    if (req.session.role == 'admin') {
        next();
    } else {
        res.status(403).json({ msg: 'Unauthorised' });
    }
};


module.exports = isAdmin;