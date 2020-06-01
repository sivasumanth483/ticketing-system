const verifyToken = require('./verifyToken');
async function verifyAdmin(req, res, next) {
    let responseObj = {};
    try {
        let cookie = req.get('token');
        let tokenData = await verifyToken(cookie);
        req.userData = tokenData;
        if (tokenData.role == "admin") {
            console.log("User Authenticated", req.userData);
            next();
        } else {
            console.log("Error at middleware verify user", error);
            responseObj.status = 401;
            responseObj.message = "Unauthorized request";
            res.send(responseObj);
        }
    } catch (error) {
        console.log("Error at middleware verify user", error);
        responseObj.status = 401;
        responseObj.message = "Unauthorized request";
        res.send(responseObj);
    }
}

module.exports = verifyAdmin;