const mongoose = require('mongoose');
const ticketSchema = mongoose.Schema({
    "sourceId": mongoose.Types.ObjectId,
    "destinationId": mongoose.Types.ObjectId,
    "trainId": mongoose.Schema.Types.ObjectId,
    "journeydate": Number,
    "bookingdate": Number,
    "passengers": [
        {
            "name": String,
            "age": Number,
            "gender": String
        }
    ],
    "phone": Number,
    "price": Number,
    "payment": String,
    "bookingstatus": String,
    "createddate": Number,
    "modifieddate": Number,
    "createdby": String,
    "modifiedby": String
});

module.exports = mongoose.model('bookings', ticketSchema);