const middleware = require('../middlewares/verifyUser');
const ticketsController = require('../controller/tickets');
module.exports = {
    configure: function (app) {

        const tickets = new ticketsController();

        app.post("/api/bookticket", middleware, async function (req, res) {
            try {
                let bookingId = await tickets.bookTickets(req.body, req.userData);
                res.send(bookingId);
            } catch (error) {
                let responseObj = {};
                console.log(error, error.stack);
                responseObj.status = 500;
                responseObj.message = "Internal Server error";
                res.send(responseObj);
            }
        });

        app.get("/api/tickethistory", middleware, async function (req, res) {
            try {
                console.log(req.userData);
                await tickets.bookingHistory(req.userData);
                res.send(req.userData);
            } catch (error) {
                let responseObj = {};
                console.log(error, error.stack);
                responseObj.status = 500;
                responseObj.message = "Internal Server error";
                res.send(responseObj);
            }
        });

        app.post('/api/findprice', middleware, async function (req, res) {
            try {
                console.log(req.body);
                let priceResponse = await tickets.findPrice(req.body);
                res.send(priceResponse);
            } catch (error) {
                let responseObj = {};
                console.log(error, error.stack);
                responseObj.status = 500;
                responseObj.message = "Internal Server error";
                res.send(responseObj);
            }
        });

        app.post('/api/cancelticket', middleware, async function (req, res) {
            try {
                let ticketId = await tickets.cancelTicket(req.body.ticketId);
                res.send(ticketId);
            } catch (error) {
                let responseObj = {};
                console.log(error, error.stack);
                responseObj.status = 500;
                responseObj.message = "Internal Server error";
                res.send(responseObj);
            }
        });

    }
};

