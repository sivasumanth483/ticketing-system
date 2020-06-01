const ticketsModel = require('../models/tickets');
const trainModel = require('../models/trains');
const mongoose = require('mongoose');
const config = require('../config.json');
const getTimeStamp = require('../utils/getTimeStamp');

class ticketsController {
    async bookingHistory({ email }) {
        try {
            console.log(email);
            let ticketHistory = await ticketsModel.aggregate([
                {
                    "$match": { "createdby": email }
                }
            ]);
            console.log("Tickets ", ticketHistory.length);
            let trainsIds = [];
            ticketHistory.forEach(tickets => {
                trainsIds.push({ "_id": mongoose.Types.ObjectId(tickets.train) });
            });
            console.log("Trains ids ", trainsIds);
            let trainDetails = await trainModel.aggregate([
                [
                    {
                        $match:
                        {
                            "$and": [trainsIds]
                        }
                    }
                ]
            ]);
            console.log("???????????", trainDetails);
        } catch (error) {

        }
    }
    async bookTickets(bookingObj, userDetails) {
        try {
            let responseObj = {};
            let price = await this.findPrice(bookingObj);
            console.log(typeof getTimeStamp());
            bookingObj.price = price.data.price;
            bookingObj.sourceId = mongoose.Types.ObjectId(bookingObj.sourceId);
            bookingObj.destinationId = mongoose.Types.ObjectId(bookingObj.destinationId);
            bookingObj.trainId = mongoose.Types.ObjectId(bookingObj.trainId);
            bookingObj.journeydate = getTimeStamp(bookingObj.bookingdate);
            bookingObj.bookingdate = getTimeStamp(bookingObj.bookingdate);
            bookingObj.createddate = getTimeStamp();
            bookingObj.modifieddate = getTimeStamp();
            bookingObj.createdby = userDetails.email;
            bookingObj.modifiedby = userDetails.email;
            bookingObj.payment = "done";
            bookingObj.bookingstatus = "booked";
            console.log(bookingObj.price);
            let bookTicket = new ticketsModel(bookingObj);
            let ticketId = await bookTicket.save();
            let bookedId = ticketId._id.toString();
            console.log("Ticket booked successfully");
            responseObj.status = 200;
            responseObj.message = "Ticket booked successfully";
            responseObj.data = {
                bookingId: bookedId
            };
            return responseObj;
        } catch (error) {
            console.log(error, error.stack);
            let responseObj = {};
            responseObj.status = 500;
            responseObj.message = "Internal Server Error";
            return responseObj;
        }
    }
    async findPrice(journeyDetails) {
        try {
            let responseObj = {};
            let { sourceId, destinationId, trainId, passengers } = journeyDetails;
            let trainDetails = (await trainModel.findById(trainId)).toObject();
            let distance = this.getDistance(sourceId, destinationId, trainDetails.journey);
            let journeyPrice = this.getPrice(distance, passengers);
            journeyDetails.price = journeyPrice;
            console.log("Journey price is ", journeyPrice);
            responseObj.status = 200;
            responseObj.message = "Price calculated successfully";
            responseObj.data = journeyDetails;
            return responseObj;
        } catch (error) {
            let responseObj = {};
            responseObj.status = 500;
            responseObj.message = "Internal Server Error";
        }
    }
    getDistance(sourceId, destinationId, journeyObj) {
        let sourceKM;
        let destinationKM;
        journeyObj.forEach(station => {
            if (sourceId == station.stationId)
                sourceKM = station.distance;
            if (destinationId == station.stationId)
                destinationKM = station.distance;
        });
        return Math.abs(sourceKM - destinationKM);
    }
    getPrice(distance, passengers) {
        let price = distance * config.perKMPrice;
        let totalPrice = 0;
        passengers.forEach(passenger => {
            if (passenger.age > 5 && passenger.age < 60)
                totalPrice += price;
            else if (passenger.age >= 60)
                totalPrice += (price * config.adultConcession) / 100;
        });
        return totalPrice;
    }
    async cancelTicket(bookingId) {
        try {
            let responseObj = {};
            let condition = {
                _id: mongoose.Types.ObjectId(bookingId)
            };
            let update = {
                $set: {
                    payment: "refunded",
                    bookingstatus: "cancelled",
                    modifieddate: getTimeStamp()
                }
            };
            let cancelledData = await ticketsModel.updateOne(condition, update);
            console.log(cancelledData);
            if (cancelledData.nModified == 1) {
                responseObj.status = 200;
                responseObj.message = "Ticket has been cancelled successfully. Amount will be refunded in 7 business working days";
                responseObj.data = {
                    ticketId: bookingId
                };
                return responseObj;
            } else {
                responseObj.status = 404;
                responseObj.message = "Ticket Not Found";
                responseObj.data = {
                    ticketId: bookingId
                };
                return responseObj;
            }

        } catch (error) {
            let responseObj = {};
            responseObj.status = 500;
            responseObj.message = "Internal server error";
            return responseObj;
        }

    }
}

module.exports = ticketsController;