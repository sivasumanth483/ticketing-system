const verifyToken = require('./verifyToken');
const permissions = require('../permissions.json');
async function verifyUser(req, res, next) {
    let responseObj = {};
    try {
        let cookie = req.get('token');
        let tokenData = await verifyToken(cookie);
        req.userData = tokenData;
        console.log(req.path);
        if (permissions[tokenData["role"]][req.path] == "Allow") {
            console.log("User Authenticated", req.userData);
            next();
        } else {
            console.log("Error at middleware verify user");
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

module.exports = verifyUser;