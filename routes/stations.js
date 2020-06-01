const stationsController = require('../controller/stations');
module.exports = {
    configure: function (app) {
        const Stations = new stationsController();
        app.post('/api/stations', async (req, res) => {
            try {
                let stationsData = await Stations.login();
                console.log("Stations Data retrived");
                res.send(stationsData);
            } catch (error) {

            }
        });
    }
};
