module.exports = (client, message) => {
    if(!message.content.startsWith(client.config.prefix) || message.author.bot) return

    if (message.channel.name !== 'bot' && !message.content.startsWith(`${client.config.prefix}join`) && !message.content.startsWith(`${client.config.prefix}work`)) return

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command)
    if (!cmd) return
    if (message.member) {
	if (message.member.highestRole.comparePositionTo(message.guild.roles.find(role => role.name === cmd.conf.permLevel)) >= 0)
	    cmd.run(client, message, args)
	else
	    message.reply("You do not have permission to use this command.")
    } else {
	cmd.run(client, message, args)
    }
}
