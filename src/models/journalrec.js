const mongoose = require('mongoose')

const JournalRec = mongoose.model('JournalRec', {
    mvm1: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    mvm2: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    kmat: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    mnozstvi: {
        type: Number,
        default: 0
    },
    hmotnost: {
        type: Number
    }
})

module.exports = JournalRec