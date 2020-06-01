const middleware = require('../middlewares/verifyUser');
const trainsController = require('../controller/trains');
module.exports = {
    configure: function (app) {
        const trains = new trainsController();
        app.post('/api/searchtrains', middleware, async (req, res) => {
            try {
                let cookie = req.get('token');
                let trainsData = await trains.getTrains(req.body);
                console.log("trainsData retrieved");
                res.cookie('token', cookie, {
                    maxAge: 15 * 60 * 1000
                });
                res.send(trainsData);
            } catch (error) {
                console.log(error, error.stack);
            }
        });
    }
};