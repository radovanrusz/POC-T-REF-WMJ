const request = require('supertest')
const app = require('../src/app')
const JournalRec = require('../src/models/journalrec')
const setupDatabase = require('./fixtures/db')

beforeAll(setupDatabase)

test('Create journal rec', async () => {
    const response = await request(app).post('/journal').
        send({mvm1: 'wh1',
            mvm2: 'wh2',
            kmat: 'mat2', 
            mnozstvi: 20,
            hmotnost: 2000}).
        expect(201)
    const journalrec = await JournalRec.findById(response.body._id)
    expect(journalrec).not.toBeNull()
})

test('Read journal recs', async () => {
    const response = await request(app).
        get('/journal').
        send().
        expect(200)
    expect(response.body.length).toEqual(3)
})