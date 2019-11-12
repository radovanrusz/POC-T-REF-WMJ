const express = require('express')
require('./db/mongoose')
const journalRouter = require('./routers/journalrec')

const app = express()

app.use(express.json())
app.use(journalRouter)

module.exports = app