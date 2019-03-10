  // Initialization
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
    taskName:String,
    taskDescription:String,
    startDate:Date,
    endDate:Date,
    status:Number,
    userId:String
});


// Export ideas model
module.exports = mongoose.model('task', TaskSchema);