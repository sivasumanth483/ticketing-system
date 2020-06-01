const middleware = require('../middlewares/verifyUser');
const trainsController = require('../controller/trains');


module.exports = {
    configure: function (app) {
        const trains = new trainsController();
        app.post('/api/searchtrains', async (req, res) => {
            try {
                let cookie = req.get('token');
                let trainsData = await trains.getTrains(req.body);
                console.log("trainsData retrieved");
                res.cookie('token', cookie, {
                    maxAge: 15 * 60 * 1000
                });
                res.send(trainsData);
            } catch (error) {
                let responseObj = {};
                console.log(error, error.stack);
                responseObj.status = 500;
                responseObj.message = "Internal Server error";
                res.send(responseObj);
            }
        });

        app.post("/api/addtrain", middleware, async function (req, res) {
            try {
                console.log(req.body);
                let trainObj = req.body;
                let cookie = req.get('token');
                let data = await trains.addTrain(trainObj, req.userData);
                res.cookie('token', cookie, {
                    maxAge: 15 * 60 * 1000
                });
                res.json(data);
            } catch (error) {
                let responseObj = {};
                console.log(error, error.stack);
                responseObj.status = 500;
                responseObj.message = "Internal Server error";
                res.send(responseObj);
            }
        });
        app.post("/api/deletetrainstation", middleware, async function (req, res) {
            try {
                let { stationId, trainId } = req.body;
                let { email } = req.userData;
                let data = await trains.deleteStationFromTrain(trainId, stationId, email);
                return res.send(data);
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