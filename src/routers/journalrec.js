const express = require('express');
const JournalRec = require('../models/journalrec');
const router = new express.Router();
const asyncForEach = require ('../helpers/asyncForEach.helper');

router.post('/journal', async (req, res) => {
    const journalrec = new JournalRec(req.body);
    try {
        await journalrec.save();
        res.status(201).json(journalrec);
    } catch(e) {
        res.status(400).json({ error: e });
    }
});

router.get('/journal', async (req, res) => {
    try {
        const journal = await JournalRec.find({});
        res.json(journal);
    } catch(e) {
        res.status(500).json({ error: e });
    }
});

router.get('/initialJournal', async (req, res) => {
    try {
        await JournalRec.deleteMany();
        const jDatas = [
            { mvm1: 'wh2', mvm2: 'wh1', kmat: 'mat1', mnozstvi: 10, hmotnost: 10 },
            { mvm1: 'wh1', mvm2: 'wh1', kmat: 'mat22', mnozstvi: 1001, hmotnost: 100 },
            { mvm1: 'wh3', mvm2: 'wh2', kmat: 'mat3', mnozstvi: 10, hmotnost: 11 },
            { mvm1: 'wh2', mvm2: 'wh1', kmat: 'mat1', mnozstvi: 10, hmotnost: 101 }
        ];
        await asyncForEach(jDatas, async (item) => {
            const journalRec = new JournalRec(item);
            await journalRec.save();
        });
        const journalOk = await JournalRec.find({});
        res.json(journalOk);
    } catch(e) {
        console.error('unable to create initialData', e);
        res.status(500).json({ error: e });
    }
});

router.get('/findJournalLowerThan100', async (req, res) => {
    try {
        const journal = await JournalRec.find({ hmotnost: { $lt: 100 } });
        res.json(journal);
    } catch(e) {
        console.error('unable to execute find', e);
        res.status(500).json({ error: e });
    }
});

router.get('/findJournal', async (req, res) => {
    const params = req && req.query;
    const { kmat = '', mvm1 = '', mvm2 = '', hmotnost = '', mnozstvi = '', limit = '' } = params;
    console.log('findJournal', params);
    console.log(' kmat:',kmat, ' mvm1:',mvm1, ' mvm2:',mvm2, ' hmotnost:',hmotnost, ' mnozstvi:',mnozstvi, ' limit:',limit);
    try {
        // const findObj = {
        //     kmat: { $eq: kmat },
        //     // mvm1: { $eq: mvm1 },
        //     // mvm2: { $eq: mvm2 },
        //     // hmotnost: { $lt: hmotnost },
        //     // mnozstvi: { $eq: mnozstvi }
        // };
        const findObj = {};
        if (kmat) findObj['kmat'] = { $eq: kmat };
        if (mvm1) findObj['mvm1'] = { $eq: mvm1 };
        if (mvm2) findObj['mvm2'] = { $eq: mvm2 };
        if (hmotnost) findObj['hmotnost'] = { $lt: hmotnost };
        if (mnozstvi) findObj['mnozstvi'] = { $eq: mnozstvi };
        let journal;
        if (limit) {
            journal = await JournalRec.find(findObj).limit(Number(limit));
         } else {
            journal = await JournalRec.find(findObj);
         }
        res.json(journal);
    } catch(e) {
        console.error('unable to execute find', e);
        res.status(500).json({ error: e });
    }
});

module.exports = router;