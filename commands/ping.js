exports.run = async (client, message, args) => {
    message.channel.send("pong!").catch(console.error);
}

exports.conf = {
    dm: false,
    bot: true,
    permLevel: "Member"
}

exports.help = {
    name: "ping",
    category: "Server", 
    description: "Bot will reply with pong!",
    usage: "ping"
};
