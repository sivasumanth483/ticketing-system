const mongoose = require('mongoose');
const trainsSchema = mongoose.Schema({
    "no": Number,
    "name": String,
    "type": String,
    "journey": [
        {
            "stationId": mongoose.ObjectId,
            "arrival": String,
            "departure": String,
            "day": Number
        }
    ]
});

module.exports = mongoose.model("trains", trainsSchema);