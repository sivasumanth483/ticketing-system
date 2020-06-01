const jwt = require('jsonwebtoken');
function verifyToken(token) {

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.PRIVATEKEY, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = verifyToken;