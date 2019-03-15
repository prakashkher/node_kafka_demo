const express = require('express');
const bodyParser = require('body-parser');

const {client,kafkaAdmin} = require('./kafkaServer');
const {producer} = require('./producer');
const {consumer} = require('./consumer');



var app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.get('/',function(req,res){
    res.json({greeting:'Kafka Producer'})
});

app.listen(3000,function(){
    console.log('Server is running at 3000')
});

app.post('/sendMsg',function(req,res){
    var sentMessage = JSON.stringify(req.body.message);
    console.log('Message received for post',req.body.topic);
    payloads = [
        { topic: req.body.topic, messages:sentMessage , partition: 0 }
    ];
    console.log('Sending..');
    producer.send(payloads, function (err, data) {
        if(err){
            console.log(err)
        }
            res.json(data);
    });
    
});

app.get('/topics',(req,res)=>{
    
    kafkaAdmin.listTopics((err,topics)=>{
        if(err){
            console.log('Error in List Topics :',err);
            res.status(500).send(err);
        }
        console.log(topics);
        res.send(topics);
    });
    
});

app.post('/topics',(req,res)=>{
    var topics = req.body.topics;
    console.log('topics to create',topics);
    //client.createTopics(topics,(err,result)=>{
    kafkaAdmin.createTopics(topics,(err,result)=>{
        if(err){
            console.log('Error in Create Topics :',err);
            res.status(500).send(err);
        }
        console.log(result);
        res.send(result);
    });
});

app.post('/add-topics',(req,res)=>{
    var topics = req.body.topics;
    var fromOffset = req.body.fromOffset;
    console.log('topics to be added',topics);
    consumer.addTopics(topics,(err,result)=>{
        if(err){
            console.log('Error in Add Topics :',err);
            res.status(500).send(err);
        }
        console.log(result);
        res.send(result);
    },fromOffset);
});

app.delete('/remove-topics',(req,res)=>{
    var topics = req.body.topics;
    console.log('topics to be removed',topics);
    consumer.removeTopics(topics,(err,result)=>{
        if(err){
            console.log('Error in Remove Topics :',err);
            res.status(500).send(err);
        }
        console.log(result);
        res.status(200).send();
    });
});
