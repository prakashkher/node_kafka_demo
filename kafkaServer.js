const kafka = require('kafka-node');


const client = new kafka.KafkaClient();
const kafkaAdmin = new kafka.Admin(client);

module.exports = {client,kafkaAdmin,kafka};