const app = require('./app')
const port = process.env.PORT
// require('./kafkaProducer')
require('./kafkaConsumer')

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})