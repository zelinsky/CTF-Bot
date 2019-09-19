// Respond to commands
module.exports = async (client, message) => {

    // Don't listen to other bots
    if (message.author.bot) return;
    
    // Checks if the bot was mentioned, with no message after it, returns help command.
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.guild && message.content.match(prefixMention)) {
	const botch = message.guild.channels.find(channel => channel.name === 'bot');
	return message.reply(`Use \`${client.config.prefix}help\` in the ${botch} channel.`).catch(console.error);
    }

    // Don't listen to messages that aren't commands
    if(!message.content.startsWith(client.config.prefix)) return;

    // Seperate command name and arguments
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);

    // Return if command not found
    if (!cmd) return;

    // Continue if command is a DM command in a DM channel, command is supposed to be used outside of the bot channel, or if command is used in bot channel.
    if (cmd.conf.bot && message.channel.name !== 'bot') return;
    if (!cmd.conf.dm && message.channel.type === 'dm') return;

    // Check permissions for commands run in guild
    // Okay for not checking dm command as the only dm command right now is !join and can be used by @everyone
    if (message.member && client.config.perms.indexOf(message.member.highestRole.name) < client.config.perms.indexOf(cmd.conf.permLevel))
	return message.reply("You do not have permission to use this command.").catch(console.error);

    // Log command and run it
    client.logger.cmd(`[CMD] ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
    cmd.run(client, message, args);
};
