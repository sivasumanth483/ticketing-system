/**
    ==> Save Trains Journey
        --> Capture details From front-end and save in DB
    ==> Book the tickets    
        --> Ticket price 
        --> Save ticket against user
    ==> Retrieve Tickets    
*/
const dotEnv = require('dotenv').config();
console.log("Environment Variables loaded", dotEnv.parsed);
require('./connection.js');

const express = require('express');
const app = express();


app.use(express.json());


const userRoutes = require('./routes/users');
const stations = require('./routes/stations');
const trains = require('./routes/trains');
const tickets = require('./routes/tickets');
userRoutes.configure(app);
stations.configure(app);
trains.configure(app);
tickets.configure(app);





app.listen(process.env.PORT, () => {
    console.log("Server running at ", process.env.PORT);
});