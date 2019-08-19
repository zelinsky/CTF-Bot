exports.run = (client, message, args) => {

  if(!message.channel.parent || message.channel.name === 'general')
    return message.delete().then(message => message.reply("You must use the **work** command in a CTF problem channel!")).catch(console.error)

  const ctfname = message.channel.parent.name
  const problem = message.channel.name
  const newRole = message.guild.roles.find(role => role.name === `${ctfname}-${problem}`)

  if (!newRole)
    return console.log(`The ${ctfname}-${problem} role does not exist`)

  const prevRole = message.member.roles.find(role => role.name.startsWith(ctfname))
  if (prevRole)
    message.member.removeRole(prevRole).catch(console.error)

  if (prevRole !== newRole)
    return message.delete().then(message => message.member.addRole(newRole)).catch(console.error)
  else
    return message.delete().catch(console.error)

}

exports.conf = {
    permLevel: "Member"
}

exports.help = {
  name: "work",
  description: "Will assign you to be working on the CTF problem of the current channel. Will unassign you from CTF problem if already assigned. Must be used in a CTF Problem channel.",
  usage: "work"
};
