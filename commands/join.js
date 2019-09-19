// DM command for assigning the user the Member role if the correct flag is given
exports.run = async (client, message, args) => {

    // If command not sent in a DM, respond with error and then delete both messages
    if (message.channel.type !== 'dm')
	return message.delete().then(message.reply(`Please use this command in a DM to me ${client.user}!`).then(msg => msg.delete(client.config.timeout))).catch(console.error);

    // Flag must be specified
    if (!args[0])
	return message.reply("Please specify a flag!");
    
    // Get the guild from the client since this is a DM
    const guild = client.guilds.first();
    
    // Find the Member role in the guild
    const memberRole = guild.roles.find(role => role.name === "Member");

    // Error if no Member role
    if (!memberRole)
	return console.log("The Member role does not exist");
    
    // Get guild member from user
    const guildMember = guild.member(message.author);

    // Check flag
    if (args[0] === client.config.member_flag) {
	if (guildMember.roles.has(memberRole.id)) // If member already has the Member role
	    return message.reply("You are already a member!");
	else
	    return guildMember.addRole(memberRole).then(guildMember => message.reply(`Congratulations **${guildMember.user.username}**, you are now a member of UDCTF and have access to all channels!`)).catch(console.error);
    } else {
	return message.reply("Incorrect flag!");
    }
};

exports.conf = {
    dm: true,
    bot: false,
    permLevel: "@everyone"
};

exports.help = {
    name: "join",
    category: "Server",
    description: "Adds user as Member of UDCTF if correct flag is given. Must use in DM to [CB] CTF-Bot.",
    usage: "join UDCTF{fl4g}"
};
