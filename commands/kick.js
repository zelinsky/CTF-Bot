exports.run = async (client, message, [mention, ...reason]) => {

  if (message.mentions.members.size === 0)
    return message.reply("Please mention a user to kick")

  if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.reply("")

  const kickMember = message.mentions.members.first()

  if (!kickMember.kickable)
    return message.reply("I can't kick this user. Sorry!")

  kickMember.kick(reason.join(" ")).then(member => {
    message.reply(`${member.user.username} was succesfully kicked.`)
  }).catch(console.error)
}

exports.conf = {
    dm: false,
    bot: true,
    permLevel: "Admin"
}

exports.help = {
    name: "kick",
    category: "Server",
    description: "Kicks a user.",
    usage: "kick @user [reason]"
};
