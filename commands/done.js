// Sets the channel topic for the CTF Problem Channel used in
exports.run = async (client, message, info) => {

    // If not used in a CTF Problem Channel, return with error message and delete both messages
    if(!message.channel.parent || message.channel.name === 'general')
	return message.delete().then(message => message.reply("You must use the **done** command in a **CTF Problem Channel**!").then(msg => msg.delete(client.config.timeout))).catch(console.error)

    // If channel is already marked, unmark it, else mark it
    if (message.channel.name.startsWith(client.config.flag)) 
	message.channel.setName(message.channel.name.substring(client.config.flag.length)).then(message.delete()).catch(console.error);
    else
	message.channel.setName(`${client.config.flag}${message.channel.name}`).then(message.delete()).catch(console.error);

};


exports.conf = {
    dm: false,
    bot: false,
    permLevel: "Member"
};

exports.help = {
    name: "done",
    category: "CTF Problem",
    description: "(Un)marks the problem of the current channel as completed.",
    usage: "done"
};
