const mongoose = require('mongoose');
 

const CaseSchema = mongoose.Schema({
    title: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    adress: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('Cases', CaseSchema);