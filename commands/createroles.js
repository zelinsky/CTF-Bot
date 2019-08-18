exports.run = (client, message, args) => {

  if (!args[0])
    return message.reply("You must specify a CTF Category to create roles for.")

  const ctfname = args[0].toLowerCase()

  const ctf = message.guild.channels.find(channel => (channel.name.toLowerCase() === ctfname) && channel.type === 'category')

  if (!ctf)
    return message.reply(`${ctfname} is not a valid CTF!`)

  ctf.children.forEach(channel => {
    if (channel.name !== 'general') {
      let newRole = `${ctf.name}-${channel.name}`
      if (!message.guild.roles.find(role => role.name === newRole)) {
        message.guild.createRole({name:newRole, color:'BLUE', hoist: true, permissions: 104324673}).then(message.reply(`Created **${newRole}** role!`)).catch(console.error)
      }
    }
  })
}

exports.help = {
  name: "createroles",
  description: "Will create roles for problems of the given CTF Category.",
  usage: "createroles ctf"
};
