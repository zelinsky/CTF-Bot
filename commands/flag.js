exports.run = async (client, message, flags) => {

    if (!message.channel.parent || message.channel.name === 'general')
	return message.delete().then(message.reply("You must use the **info** command in a **CTF Problem Channel**!").then(msg => msg.delete(client.config.timeout))).catch(console.error);

    if (flags.length === 0)
	return message.reply("You must specify at least one flag.").catch(console.error);

    flags.forEach(f => {
	const flagChannel = message.guild.channels.find(channel => channel.name === 'flags');
	flagChannel.send(`__**${message.member.displayName}**__ captured the flag \`${f}\` for **${message.channel.name}** of **${message.channel.parent.name}**!`);

    });
};

exports.conf = {
    dm: false,
    bot: false,
    permLevel: "Member"
}

exports.help = {
    name: "flag",
    category: "CTF Problem",
    description: "Declares you found the flag for the problem of the current channel.",
    usage: "flag ctf{fl4g} [...flags]"
};
