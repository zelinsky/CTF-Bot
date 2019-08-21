// Kicks the specified user from the server
exports.run = async (client, message, [mention, ...reason]) => {

    // If no user was mentioned (with @), return with error message
    if (message.mentions.members.size === 0)
	return message.reply("Please mention a user to kick");

    // If bot doesn't have permission
    if (!message.guild.me.hasPermission("KICK_MEMBERS"))
	return message.reply("");

    // Get the first mentioned user
    const kickMember = message.mentions.members.first();

    // Check if user is kickable, return with error if not
    if (!kickMember.kickable)
	return message.reply("I can't kick this user. Sorry!");

    // Kick user with reason if given
    kickMember.kick(reason.join(" ")).then(member => {
	message.reply(`${member.user.username} was succesfully kicked.`);
    }).catch(console.error);
};

exports.conf = {
    dm: false,
    bot: true,
    permLevel: "Admin"
};

exports.help = {
    name: "kick",
    category: "Server",
    description: "Kicks a user.",
    usage: "kick @user [reason]"
};
