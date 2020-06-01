const mongoose = require('mongoose');
const trainsModel = require('../models/trains');
class trainsController {
    async getTrains(travelObject) {
        console.log("Travel object at trains controller", travelObject);
        let sourceStationId = travelObject.from.stationId;
        let destinationStationID = travelObject.to.stationId;
        console.log(sourceStationId, destinationStationID);
        try {
            let trainsData = await trainsModel.aggregate([
                {
                    "$match": {
                        "$and": [
                            {
                                "journey.stationId": mongoose.Types.ObjectId(sourceStationId)
                            },
                            {
                                "journey.stationId": mongoose.Types.ObjectId(destinationStationID)
                            }
                        ]
                    }
                }
            ]);

            return trainsData;

        } catch (error) {
            console.log("Error at trains controller", error, error.stack);
        }
    }

}

module.exports = trainsController;