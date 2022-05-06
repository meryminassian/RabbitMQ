const amqp = require('amqplib/callback_api'); 


//connect to the rabbitmq management  
amqp.connect(`amqp://localhost`, (err, connection) => {
    if(err){
        throw err; 
    }
    connection.createChannel((err, channel)=>{
        if(err){
            throw err; 
        }
        let queueName = "testQueue"; 
        
        //what if we dont have the queue in the server?
        //assertQueue will let us to create a queue if there is no such queue available 
        channel.assertQueue(queueName); 

        //receive the message 
        channel.consume(queueName, (msg) => {
            console.log(`received: ${msg.content.toString()}`); 
        }, 
        //if we run ths again and again, the message will still be available 
        //we need to acknowledge that we got the message, otherwive the message will remain in the queue
        {
            noAck: true
        }
        
        )
    })
}); 