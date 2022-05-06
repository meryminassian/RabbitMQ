const amqp = require('amqplib/callback_api'); 
 

//connect to the rabbitmq server 
amqp.connect(`amqp://localhost`, (err, connection) => {
    if(err){
        throw err; 
    }
    connection.createChannel((err, channel)=>{
        if(err){
            throw err; 
        }
        let queueName = "testQueue"; 
        let message = "message number 1";

        //what if we dont have the queue in the server 
        channel.assertQueue(queueName); 

        channel.sendToQueue(queueName, Buffer.from(message)); 
        
        setTimeout(()=> {
            connection.close(); 
        }, 1000)
    })
}); 

