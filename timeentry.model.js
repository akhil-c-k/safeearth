const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TimeSchema = new Schema({
    taskName: String,
    projectName: String,
    startTime: String,
    endTime: String,
});
module.exports = mongoose.model('Timeentry', TimeSchema);