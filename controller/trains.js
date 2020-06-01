const mongoose = require('mongoose');
const trainsModel = require('../models/trains');
const stationModel = require('../models/stations');
const getTimeStamp = require('../utils/getTimeStamp');
class trainsController {
    async getTrains(travelObject) {
        console.log("Travel object at trains controller", travelObject);
        let sourceStationId = travelObject.from.stationId;
        let destinationStationID = travelObject.to.stationId;
        let journeyDate = travelObject.journeyDate;
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
                },{
                    $project:{
                        no:1,
                        name:1,
                        type:1,
                        sourceId:1,
                        destinationId:1
                    }
                }
            ]);
            let stationData = await stationModel.find({
                _id: {
                    $in: [
                        mongoose.Types.ObjectId(sourceStationId),
                        mongoose.Types.ObjectId(destinationStationID)
                    ]
                }
            },"stationname code").exec();
            console.log("stationData retrived");
            let trainsList = this.getTrainsList(trainsData, stationData, sourceStationId, destinationStationID);

            return trainsList;

        } catch (error) {
            console.log("Error at trains controller", error, error.stack);
        }
    }
    async addTrain(train, userData) {
        try {
            let responseObj = {};
            train.createdby = userData.email;
            train.modifiedby = userData.email;
            train.sourceId = mongoose.Types.ObjectId(train.journey[0]["stationId"]);
            train.destinationId = mongoose.Types.ObjectId(train.journey[train.journey.length - 1]["stationId"]);
            train.createdby = userData.email;
            train.modifiedby = userData.email;
            train.createddate = getTimeStamp();
            train.modifieddate = getTimeStamp();
            this.convertJourneyIdToObjectId(train.journey);
            let addTraindata = new trainsModel(train);
            let addTrainResponse = await addTraindata.save();
            addTrainResponse = JSON.parse(JSON.stringify(addTrainResponse));
            console.log(addTrainResponse);
            responseObj.status = 200;
            responseObj.message = "Train data added";
            responseObj.data = addTrainResponse;
            return responseObj;
        } catch (error) {
            console.log(error, error.stack);
            let responseObj = {};
            console.log(error, error.stack);
            responseObj.status = 500;
            responseObj.message = "Internal Server error";
            return responseObj;
        }

    }
    
    convertJourneyIdToObjectId(journey) {

        journey.forEach(station => {
            station.stationId = mongoose.Types.ObjectId(station.stationId);
        });
    }

    async deleteStationFromTrain(trainId, stationId, email) {
        try {
            let responseObj = {};
            let stationObj = {
                _id: mongoose.Types.ObjectId(trainId)
            };
            let deleteQuery = {
                "$pull": {
                    "journey": {
                        _id: mongoose.Types.ObjectId(stationId)
                    }
                }
            };
            let data = await trainsModel.update(stationObj, deleteQuery);
            if (data.nModified == 1) {
                await trainsModel.findByIdAndUpdate(stationObj, { $set: { modifiedby: email, modifieddate: getTimeStamp() } });
                console.log("station Deleted successfully");
                responseObj.status = 200;
                responseObj.message = "Station deleted ";
                return responseObj;
            }
            responseObj.status = 200;
            responseObj.message = "Resource not found";
            return responseObj;

        } catch (error) {
            console.log(error, error.stack);
            let responseObj = {};
            console.log(error, error.stack);
            responseObj.status = 500;
            responseObj.message = "Internal Server error";
            return responseObj;
        }
    }
    getTrainsList(trains, stationData, sourceStationId, destinationId) {
        let sourceStation;
        let destionationStation;
        let travelObj;
        stationData.forEach(station => {
            if (sourceStationId == station._id.toString()) {
                station._id = station._id.toString();
                sourceStation = station;
            }
            if (destinationId == station._id.toString()) {
                station._id = station._id.toString();
                destionationStation = station;
            }
        });
        trains.forEach(train => {
            delete train.journey;
        });
        travelObj = {
            sourceObj: sourceStation.toObject(),
            destionationObj: destionationStation.toObject(),
            trains: trains
        };


        console.log("?????", sourceStation.toObject(), destionationStation.toObject());
        return travelObj;
    }

}

module.exports = trainsController;