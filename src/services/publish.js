const amqplib = require('amqplib');
const { v4 } = require('uuid')

const uuid = v4();

export const publishMessage = async (message) => {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const q = await channel.assertQueue('', {exclusive: true});

  channel.sendToQueue('rbmq01', Buffer.from(JSON.stringify(message)), {
    replyTo: q.queue,
    correlationId: uuid
  });

  channel.consume(q.queue, msg => {
    if(msg.properties.correlationId == uuid){
      console.log(' [.] Got %s', msg.content.toString());
      setTimeout(() => {
        connection.close();
        process.exit(0);
      }, 500)
    }
  }, {noAck: true});
}
