// Sends a message in #flags that the user captured the flag for the CTF Problem Channel used in
exports.run = async (client, message, flags) => {

    // If not used in a CTF Problem Channel, return with error message and delete both messages
    if (!message.channel.parent || message.channel.name === 'general')
	return message.delete().then(message.reply("You must use the **info** command in a **CTF Problem Channel**!").then(msg => msg.delete(client.config.timeout))).catch(console.error);

    // Return with error if not flags specified
    if (flags.length === 0)
	return message.reply("You must specify a flag.").catch(console.error);

    // For each flag, send message in #flags
    const flagChannel = message.guild.channels.find(channel => channel.name === 'flags' && !channel.parent);
    
    // Remove emoji prefix if present
    let problem = message.channel.name.startsWith(client.config.flag) ? message.channel.name.substr(client.config.flag.length) : message.channel.name;
    let f = flags.join('');
    flagChannel.send(`__**${message.channel.parent.name.toUpperCase()}**__ - **${message.member.displayName}** captured the flag \`${f}\` for **${problem}**!`);
};

exports.conf = {
    dm: false,
    bot: false,
    permLevel: "Member"
};

exports.help = {
    name: "flag",
    category: "CTF Problem",
    description: "Declares you found a flag for the problem of the current channel.",
    usage: "flag ctf{fl4g}"
};
