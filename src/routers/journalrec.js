const express = require('express');
const JournalRec = require('../models/journalrec');
const router = new express.Router();
const asyncForEach = require('../helpers/asyncForEach.helper');
const mockInitialJournal = require('../mockData/initialJournal.json');

router.post('/journal', async (req, res) => {
    const journalrec = new JournalRec(req.body);
    try {
        await journalrec.save();
        res.status(201).json(journalrec);
    } catch(e) {
        res.status(400).json({error: e});
    }
});

router.get('/journal', async (req, res) => {
    const params = req && req.query;
    const {kmat = '', mvm1 = '', mvm2 = '', from = '', to = '', limit = ''} = params;
    console.log('findJournal', params);
    console.log(' kmat:', kmat, ' mvm1:', mvm1, ' mvm2:', mvm2, ' from:', from, ' to:', to, ' limit:', limit);
    try {

        /*
         *   const findObj = {
         *    kmat: { $eq: kmat },
         *    mvm1: { $eq: mvm1 },
         *    mvm2: { $eq: mvm2 },
         *    from: { $gte: from },
         *    to: { $lte: to }
         * };
         */
        const findObj = {};
        if (kmat) {
            findObj.kmat = {$eq: kmat};
        }
        if (mvm1) {
            findObj.mvm1 = {$eq: mvm1};
        }
        if (mvm2) {
            findObj.mvm2 = {$eq: mvm2};
        }
        if (from) {
            findObj.from = {$gte: from};
        }
        if (to) {
            findObj.to = {$lte: to};
        }
        let journal = '';
        if (limit) {
            journal = await JournalRec.find(findObj).limit(Number(limit));
        } else {
            journal = await JournalRec.find(findObj);
        }
        res.json(journal);
    } catch(e) {
        console.error('unable to execute find', e);
        res.status(500).json({error: e});
    }
});

router.get('/initialJournal', async (req, res) => {
    try {
        await JournalRec.deleteMany();
        await asyncForEach(mockInitialJournal, async (item) => {
            const journalRec = new JournalRec(item);
            await journalRec.save();
        });
        const journalOk = await JournalRec.find({});
        res.json(journalOk);
    } catch(e) {
        console.error('unable to create initialData', e);
        res.status(500).json({error: e});
    }
});

module.exports = router;