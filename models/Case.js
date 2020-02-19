const mongoose = require('mongoose');
 

const CaseSchema = mongoose.Schema({
    nrRef: {
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
    adress: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Cases', CaseSchema);