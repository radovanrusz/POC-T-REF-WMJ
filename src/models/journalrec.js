const mongoose = require('mongoose');
const journalSchema = {
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
};
const JournalRec = mongoose.model('JournalRec', journalSchema);

module.exports = JournalRec;