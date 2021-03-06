// Sets the channel topic for the CTF Problem Channel used in
exports.run = async (client, message, info) => {

    // If not used in a CTF Problem Channel, return with error message and delete both messages
    if(!message.channel.parent || message.channel.name === 'general')
	return message.delete().then(message => message.reply("You must use the **info** command in a **CTF Problem Channel**!").then(msg => msg.delete(client.config.timeout))).catch(console.error)

    // Set topic
    message.channel.setTopic(info.join(" ")).catch(console.error);
};

exports.conf = {
    dm: false,
    bot: false,
    permLevel: "Member"
};

exports.help = {
    name: "info",
    category: "CTF Problem",
    description: "Sets the channel description to the provided message.",
    usage: "info ...message"
};
