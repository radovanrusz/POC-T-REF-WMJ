// A const mongoose = require('mongoose')
const JournalRec = require('../../src/models/journalrec')

const journalrecOne = {
    mvm1: 'wh1',
    mvm2: 'wh2',
    kmat: 'mat1', 
    mnozstvi: 10,
    hmotnost: 1000
}

const journalrecTwo = {
    mvm1: 'wh2',
    mvm2: 'wh1',
    kmat: 'mat1', 
    mnozstvi: 10,
    hmotnost: 1000
}

const setupDatabase = async () => {
    await JournalRec.deleteMany()
    await new JournalRec(journalrecOne).save()
    await new JournalRec(journalrecTwo).save()
}

module.exports = setupDatabase