// Sends a message in #flags that the user captured the flag for the CTF Problem Channel used in
exports.run = async (client, message, flags) => {

    // If not used in a CTF Problem Channel, return with error message and delete both messages
    if (!message.channel.parent || message.channel.name === 'general')
	return message.delete().then(message.reply("You must use the **info** command in a **CTF Problem Channel**!").then(msg => msg.delete(client.config.timeout))).catch(console.error);

    // Return with error if not flags specified
    if (flags.length === 0)
	return message.reply("You must specify a flag.").catch(console.error);

    // Send message in #flags
    const flagChannel = message.guild.channels.find(channel => channel.name === 'flags' && !channel.parent);
    
    // Remove emoji prefix if present
    let problem = message.channel.name.startsWith(client.config.flag) ? message.channel.name.substr(client.config.flag.length) : message.channel.name;
    let f = "";

    // Check for -d option at beginning or end
    if (flags[0] === '-d') {
	f = flags.slice(1).join(' ');
    } else if (flags[flags.length-1] === '-d') {
	f = flags.slice(0, -1).join(' ');
    } else { // No -d option
	f = flags.join(' ');
	
	// If channel is unmarked, mark it
	if (!message.channel.name.startsWith(client.config.flag)) 
	    message.channel.setName(`${client.config.flag}${message.channel.name}`).catch(console.error);
    }

    // i.e. if the command was not '!flag -d'
    if (f)
	flagChannel.send(`__**${message.channel.parent.name.toUpperCase()}**__ - **${message.member.displayName}** captured the flag \`${f}\` for **${problem}**!`);
    else
	return message.reply("You must specify a flag.").catch(console.error);

};

exports.conf = {
    dm: false,
    bot: false,
    permLevel: "Member"
};

exports.help = {
    name: "flag",
    category: "CTF Problem",
    description: "Declares you found a flag for the problem of the current channel, and marks the channel with a flag emoji. If you don't want to mark the channel, use the -d flag.",
    usage: "flag [-d] ctf{fl4g}"
};
