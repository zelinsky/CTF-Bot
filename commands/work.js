// Assigns user corresponding role for CTF Problem Channel used in
exports.run = async (client, message, args) => {

    // If not used in a CTF Problem Channel, return with error message and delete both messages
    if(!message.channel.parent || message.channel.name === 'general')
	return message.delete().then(message => message.reply("You must use the **work** command in a CTF problem channel!").then(msg => msg.delete(client.config.timeout))).catch(console.error);

    // Get ctf name and problem name based on channel
    const ctfname = message.channel.parent.name;
    const problem = message.channel.name.startsWith(client.config.flag) ? message.channel.name.substr(1) : message.channel.name

    // Find role
    const newRole = message.guild.roles.find(role => role.name === `${ctfname}-${problem}`);

    // Return error message if role not found
    if (!newRole)
	return console.log(`The ${ctfname}-${problem} role does not exist`);

    // If the user already has a role for this ctf, remove it
    const prevRole = message.member.roles.find(role => role.name.startsWith(ctfname));
    if (prevRole)
	message.member.removeRole(prevRole).catch(console.error);

    // If the user is selecting a new role, add it, and delete the command
    if (prevRole !== newRole) {
	return message.delete().then(message => message.member.addRole(newRole)).catch(console.error);
    } else {
	return message.delete().catch(console.error);
    }

};

exports.conf = {
    dm: false,
    bot: false,
    permLevel: "Member"
};

exports.help = {
    name: "work",
    category: "CTF Problem",
    description: "Will (un)assign you to be working on the CTF problem of the current channel.",
    usage: "work"
};
