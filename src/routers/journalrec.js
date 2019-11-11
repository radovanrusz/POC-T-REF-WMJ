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

module.exports = router