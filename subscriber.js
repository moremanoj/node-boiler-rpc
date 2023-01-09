const amqplib = require('amqplib');

const queueName = "rbmq01";

const processTask = async () => {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  channel.prefetch(1);
  console.log('[x] Awaiting RPC requests');

  channel.consume(queueName, msg => {
    const data =  JSON.parse(msg.content.toString());
    console.log(msg.properties.correlationId);

    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(data)), {
      correlationId: msg.properties.correlationId
    });

    channel.ack(msg);

  }, {noAck: false})
}

processTask();