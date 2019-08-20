module.exports = async (client, message) => {

    if (message.author.bot) return;
    
    // Checks if the bot was mentioned, with no message after it, returns help command.
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
	const botch = message.guild.channels.find(channel => channel.name === 'bot');
	return message.reply(`Use \`${client.config.prefix}help\` in the ${botch} channel.`).catch(console.error);
    }
    
    if(!message.content.startsWith(client.config.prefix)) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command)
    if (!cmd) return;
    if (!cmd.conf.dm && cmd.conf.bot && message.channel.name !== 'bot') return;

    // Check permissions for commands run in guild
    // Okay for not checking dm command as the only dm command right now is !join
    if (message.member && message.member.highestRole.comparePositionTo(message.guild.roles.find(role => role.name === cmd.conf.permLevel)) < 0)
	message.reply("You do not have permission to use this command.").catch(console.error);

    client.logger.cmd(`[CMD] ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
    cmd.run(client, message, args)

}
