
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


// checks if current user is logged in
// and passes control over to the controller function 
// otherwise returns 'Unauthorised'.
const isUser = function(req, res, next) {
    if (req.session.role === 'user') {
        next();
    } else {
        res.status(403).json({ msg: "Unauthorised" });
    }
};



module.exports = { isAdmin, isUser };