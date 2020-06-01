const mongoose = require('mongoose');
const trainsSchema = mongoose.Schema({
    "no": {
        type: Number,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "type": {
        type: String,
        required: true
    },
    "sourceId": {
        type: mongoose.Types.ObjectId,
        required: true
    },
    "destinationId": {
        type: mongoose.Types.ObjectId,
        required: true
    },
    "journey": [
        {
            "stationId": {
                type: mongoose.Types.ObjectId,
                required: true
            },
            "arrival": {
                type: String,
                required: true
            },
            "departure": {
                type: String,
                required: true
            },
            "day": {
                type: Number,
                required: true
            },
            "distance": {
                type: Number,
                required: true
            }
        }
    ],
    "createddate": {
        type: Number,
        required: true
    },
    "modifieddate": {
        type: Number,
        required: true
    },
    "createdby": {
        type: String,
        required: true
    },
    "modifiedby": {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("trains", trainsSchema);