const mongoose = require('mongoose');

const stationsSchema = mongoose.Schema({
    "stationname": String,
    "code": String
});



module.exports = mongoose.model("stations", stationsSchema);