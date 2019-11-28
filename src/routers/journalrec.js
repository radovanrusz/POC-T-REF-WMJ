const express = require('express')
const JournalRec = require('../models/journalrec')
const router = new express.Router()

router.post('/journal', async (req, res) => {
    const journalrec = new JournalRec(req.body)
    try {
        await journalrec.save()
        res.status(201).send(journalrec)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/journal', async (req, res) => {
    try {
        const journal = await JournalRec.find({})
        res.send(journal)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/initialJournal', async (req, res) => {
    try {
        const jdatas = { mvm1: 'wh2', mvm2: 'wh1', kmat: 'mat1', mnozstvi: 10, hmotnost: 10 };
        const journalRec = new JournalRec(jdatas);
        const journal = await journalRec.save();
        res.json(journal);
    } catch(e) {
        console.error('unable to create initialData', e);
        res.status(500).json({ error: e });
    }
})

// test purpose
router.get('/findJournalLowerThan100', async (req, res) => {
    try {
        const journal = await JournalRec.find({ hmotnost: { $lt: 100 } });
        res.json(journal);
    } catch(e) {
        console.error('unable to create initialData', e);
        res.status(500).json({ error: e });
    }
})

module.exports = router