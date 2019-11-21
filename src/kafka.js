const kafkaHost = process.env.KAFKA_HOST
const kafkaHostEnv = process.env.KAFKA_HOST_ENV
const kafkaTopic = process.env.KAFKA_TOPIC
const kafka = require('kafka-node')
const JournalRec = require('./models/journalrec')

try {
    console.log('Kafka Consumer is booting up ... (kafkaHost:'+kafkaHost + ' kafkaTopic:' + kafkaTopic + ') kafkaHostEnv:' + kafkaHostEnv)
    //const client = new kafka.KafkaClient(kafkaHost)
    const client = new kafka.KafkaClient({kafkaHost: kafkaHostEnv + ':9092'});
    const topics = [
        {
            topic: kafkaTopic, 
            partition: 0
        }
    ]
    const options = {
        autoCommit: true, 
        fetchMaxWaitMs: 1000, 
        fetchMaxBytes: 1024 * 1024, 
        encoding: 'utf8', 
        fromOffset: false
    }
    
    const consumer = new kafka.Consumer(client, topics, options)

    consumer.on('message', async (message) => {    
        const journalrec = new JournalRec(JSON.parse(message.value))
        try {
            await journalrec.save()
            console.log('Journal record saved successfully')
        }catch(e) {
            console.log(e)
        }
    })

    consumer.on('error', (err) => {
        console.log('error', err)
    })
}catch(e) {
    console.log(e)
}
