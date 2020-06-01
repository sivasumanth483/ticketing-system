const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://practice:practice@cluster0-vhzh0.mongodb.net/test?retryWrites=true&w=majority', {
console.log(process.env.DBSRV);
mongoose.connect(process.env.DBSRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((result) => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.log("Error ", err);
    });




//close connection if server stopped unexpectedly 
process.on('exit', (code) => {
    mongoose.connection.close();
    console.log(`Database Connection Closed`);
});
process.on('SIGINT', () => {
    console.log("caught interrupt signa");
    process.exit();
});