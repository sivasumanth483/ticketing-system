const stationsModel = require('../models/stations');

class stationsController {
    async login() {
        try {
            let stationsData = await stationsModel.find({}).exec();
            return stationsData;
        } catch (error) {

        }
    }
}

module.exports = stationsController;