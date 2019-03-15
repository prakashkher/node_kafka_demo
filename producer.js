const {client,kafka} = require('./kafkaServer');

var producer = new kafka.Producer(client);

producer.on('ready', function () {
    console.log('Producer is ready');
});

producer.on('error', function (err) {
    console.log('Producer is in error state');
    console.log(err);
})
module.exports={producer};


