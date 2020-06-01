const jwt = require('jsonwebtoken');
function getJwtToken(obj) {
    return new Promise((resolve, reject) => {
        jwt.sign(obj, process.env.PRIVATEKEY, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = getJwtToken;