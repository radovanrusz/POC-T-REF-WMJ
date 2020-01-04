const kafkaHost = process.env.KAFKA_HOST
const kafkaPort = process.env.KAFKA_PORT
const kafkaTopic = process.env.KAFKA_TOPIC
const kafka = require('kafka-node')
const JournalRec = require('./models/journalrec')

let mDate = new Date();

try {
    console.log(mDate.toString() + ': Kafka Consumer is booting up ... (ENVs: kafkaHost:' + kafkaHost + '; kafkaTopic:' + kafkaTopic + '; kafkaHost:' + kafkaHost + '; kafkaPort:' + kafkaPort + '; )');
    
    const client = new kafka.KafkaClient({kafkaHost: kafkaHost + ':' + kafkaPort});

    // check for existing topics
    client.loadMetadataForTopics([kafkaTopic], (err, resp) => {
        if (err) {
            console.log('Checking for topic returns error: ' + JSON.stringify(err))     
        } else {
            console.log('Checking for topic: ' + JSON.stringify(resp))
        }
    });
    
    const topics = [
        {
            topic: kafkaTopic, 
            partition: 0
        }
    ]
    const options = {
        autoCommit: false, 
        fetchMaxWaitMs: 1000, 
        fetchMaxBytes: 1024 * 1024, 
        encoding: 'utf8', 
        fromOffset: false
    }
    
    const consumer = new kafka.Consumer(client, topics, options)
    // consumer.setOffset(kafkaTopic, 0, 0);

    client.on('ready', () => {
        console.log('Client ready!');
    });

    consumer.on('offsetOutOfRange', (err) => {
        console.log('Kafka offsetOutOfRange: ' + err);
    });
    
    consumer.on('message', (message) => {    
        mDate = new Date();
        console.log(mDate.toString() + ': consumer.on() invoked.');
        
        const journalrec = new JournalRec(JSON.parse(message.value))
        journalrec.save().then(() => {
            consumer.commit((err, dta) => {
                if (err) {
                    console.log(mDate.toString() + ': Error: ' + err);
                } else {
                    console.log(mDate.toString + ': Commit success: ', dta);
                }
            });
            console.log(mDate.toString() + ': Journal record saved successfully: ' + message.value)
        }).catch((error) => {
            console.log('journalrec.save() error:' + error);
            // here should be error handling of consumed message (e.g. putting it into fail queue)
        });

    });

    consumer.on('error', (err) => {
        console.log('consumer.on error' + err)
    })
} catch(e) {
    console.log(e)
}
