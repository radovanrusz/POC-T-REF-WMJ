const kafkaHost = process.env.KAFKA_HOST
const kafkaPort = process.env.KAFKA_PORT
const kafkaHostEnv = process.env.KAFKA_HOST_ENV
const kafkaTopic = process.env.KAFKA_TOPIC
const kafka = require('kafka-node')
const JournalRec = require('./models/journalrec')

let mDate = new Date();
let mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');

try {
    console.log(mDateStr + ': Kafka Consumer is booting up ... (ENVs: kafkaHost:' + kafkaHost + '; kafkaTopic:' + kafkaTopic + '; kafkaHostEnv:' + kafkaHostEnv + '; )');
    

    /*
     * const client = new kafka.KafkaClient(kafkaHost)
     * const client = new kafka.KafkaClient({kafkaHost: kafkaHostEnv + ':9092'});
     * const client = new kafka.KafkaClient({kafkaHost: 'apache-kafka:9092'});
     */
    const client = new kafka.KafkaClient({kafkaHost: kafkaHost + ':' + kafkaPort});
    
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
            mDate = new Date();
            mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
            console.log(mDateStr + ': Journal record saved successfully: ' + message.value)
        }catch(e) {
            mDate = new Date();
            mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
            console.log(mDateStr + ': journalrec.save() error:' + e)
        }
    })

    consumer.on('error', (err) => {
        mDate = new Date();
        mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
        console.log(mDateStr + ': Consumer on error' + err)
    })
}catch(e) {
    console.log(e)
}
