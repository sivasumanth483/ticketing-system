const stationsModel = require('../models/stations');

class stationsController {
    async login() {
        try {
            let stationsData = await stationsModel.find({});
            return stationsData;
        } catch (error) {

        }
    }
}

module.exports = stationsController;