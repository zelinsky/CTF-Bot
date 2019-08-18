exports.run = (client, message, [mention, ...reason]) => {
  const modRole = message.guild.roles.find(role => role.name === "Admin")
  if (!modRole)
    return console.log("The Admin role does not exist")

  if (!message.member.roles.has(modRole.id))
    return message.reply("You can't use this command.")

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
