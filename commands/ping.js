exports.run = (client, message, args) => {
    message.channel.send("pong!").catch(console.error);
}

exports.help = {
  name: "ping",
  description: "Bot will reply with pong!",
  usage: "ping"
};
