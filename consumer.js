var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(),
    consumer = new Consumer(client,
        [{ topic: 'Posts', offset: 10}],
        {
            fromOffset: true,
            autoCommit: false
        }
    );

consumer.on('message', function (message) {
    console.log('New Message:',message);
});

consumer.on('error', function (err) {
    console.log('Error:',err);
});

consumer.on('offsetOutOfRange', function (err) {
    console.log('offsetOutOfRange:',err);
});

module.exports={consumer};