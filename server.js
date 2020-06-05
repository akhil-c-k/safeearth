const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const timeEntryRoutes = express.Router();
const PORT = 4000;

let Timeentry = require('./timeentry.model');

app.use(cors());
app.use(bodyParser.json());
//here route will act as a middleware to handle end point
app.use('/timenetry', timeEntryRoutes);

//db connections
mongoose.connect('mongodb://127.0.0.1:27017/timeentry', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

timeEntryRoutes.route('/').get(function(req, res) {
    Timeentry.find(function(err, timeentry) {
        if (err) {
            console.log(err);
        } else {
            res.json(timeentry);
        }
    });
});

timeEntryRoutes.route('/add').post(function(req, res) {
    let addTimeEntry = new Timeentry(req.body);
    addTimeEntry.save()
        .then(timeentry => {
            res.status(200).json({'timeentry': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

app.use('/timeentry', timeEntryRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
})