const usersModel = require('../models/user');
const bcrypt = require('bcryptjs');

class userController {
    async login({ email, password }) {
        try {
            let responseObject = {};
            let userData = await usersModel.find({ email }, "email password age gender role name");
            let validateUser;
            console.log("User Details Retrived");
            if (userData.length >= 1) {
                validateUser = bcrypt.compareSync(password, userData[0]["password"]);
                if (validateUser) {
                    responseObject.status = 200;
                    responseObject.message = "Authentication Successful";
                    responseObject.data = userData[0];
                    delete responseObject.data.password;
                    return responseObject;
                } else {
                    responseObject.status = 401;
                    responseObject.message = "User not found";
                    return responseObject;
                }

            }
        } catch (error) {
            let responseObj = {};
            console.log(error, error.stack);
            responseObj.status = 500;
            responseObj.message = "Internal Server error";
            res.send(responseObj);
        }
    }
}

module.exports = userController;