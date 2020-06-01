const userController = require('../controller/users');
const generateToken = require('../utils/generateToken');

module.exports = {
    configure: function (app) {
        const users = new userController();
        app.post('/api/login', async function (req, res) {
            try {
                let usersData = req.body;
                console.log(usersData);
                let responseObj = await users.login(req.body);
                if (responseObj.status == 200) {
                    let tokenObject = {
                        email: responseObj["data"]["email"],
                        role: responseObj["data"]["role"]
                    };
                    token = await generateToken(tokenObject);
                    res.cookie('token', token, {
                        maxAge: 15 * 60 * 1000
                    });
                }
                console.log("Cookies set");
                res.send(responseObj);
            } catch (error) {
                let responseObj = {};
                console.log(error, error.stack);
                responseObj.status = 500;
                responseObj.message = "Internal Server error";
                res.send(responseObj);
            }
        });
    }
};