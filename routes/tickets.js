const middleware = require('../middlewares/verifyUser');
const ticketsController = require('../controller/tickets');
module.exports = {
    configure: function (app) {
        const tickets = new ticketsController();
        app.post("/api/bookticket", middleware, async function (req, res) {
            let bookingId = await tickets.bookTickets(req.body, req.userData);
            res.send(bookingId);
        });

        app.get("/api/tickethistory", middleware, function (req, res) {
            console.log(req.userData);
            tickets.bookingHistory(req.userData);
            res.send(req.userData);
        });
        app.post('/api/findprice', middleware, async function (req, res) {
            console.log(req.body);
            let priceResponse = await tickets.findPrice(req.body);
            res.send(priceResponse);
        });
        app.post('/api/cancelticket', middleware, async function (req, res) {
            let ticketId = await tickets.cancelTicket(req.body.ticketId);
            
        });

    }
};

