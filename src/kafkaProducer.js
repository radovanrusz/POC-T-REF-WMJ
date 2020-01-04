/*
 * this script allows inserting of mock data to Kafka topic
 * that can be afterwards consumed.
 */

const kafkaHost = process.env.KAFKA_HOST
const kafkaPort = process.env.KAFKA_PORT
const kafkaTopic = process.env.KAFKA_TOPIC

const initialMessages = require('./mockData/initialMessagesForKafka.json');
const kafka = require('kafka-node')

try {
    console.log(': Kafka Producer is booting up ... (ENVs: kafkaHost:' + kafkaHost + '; kafkaTopic:' + kafkaTopic + '; kafkaHost:' + kafkaHost + '; kafkaPort:' + kafkaPort + '; )');
    
    
    const client = new kafka.KafkaClient({kafkaHost: kafkaHost + ':' + kafkaPort});
    const producer = new kafka.Producer(client);

    const sendMessages = (topic, messages, cb) => {
        const payloads = messages.map((message) => ({
            topic,
            key: message.id,
            messages: [new kafka.KeyedMessage(message.id, JSON.stringify(message))]
        }));
        producer.send(payloads, cb);
    };

    producer.on('ready', () => {
        console.log('Producer ready')
    
        sendMessages(kafkaTopic, initialMessages, (err2) => {
            if (err2) {
                console.error(`Error sending messages: ${err2.stack || err2.message}`, err2);
                client.close();

                return;
            }
      
            console.log(`Sent ${initialMessages.length} messages`);
            client.close();
        });
    });

    producer.on('error', (err) => {
        console.log(err);
    });

} catch(e) {
    console.log(e)
}