const mongoose = require('mongoose');
const ticketSchema = mongoose.Schema({
    "sourceId": {
        type: mongoose.Types.ObjectId,
        required: true
    },
    "destinationId": {
        type: mongoose.Types.ObjectId,
        required: true
    },
    "trainId": {
        type: mongoose.Types.ObjectId,
        required: true
    },
    "journeydate": {
        type: Number,
        required: true
    },
    "bookingdate": {
        type: Number,
        required: true
    },
    "passengers": [
        {
            "name": {
                type: String,
                required: true
            },
            "age": {
                type: Number,
                required: true
            },
            "gender": {
                type: String,
                required: true
            }
        }
    ],
    "phone": {
        type: Number,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "payment": {
        type: String
    },
    "bookingstatus": {
        type: String
    },
    "createddate": {
        type: Number
    },
    "modifieddate": {
        type: Number
    },
    "createdby": {
        type: String
    },
    "modifiedby": {
        type: String
    }
});

module.exports = mongoose.model('bookings', ticketSchema);