exports.run = (client, message, [ctf, ...problems]) => {

  const modRole = message.guild.roles.find(role => role.name === "Mod")
  if (!modRole)
    return console.log("The Mod role does not exist")

  if (!message.member.roles.has(modRole.id))
    return message.reply("You can't use this command.").catch(console.error)

  if (!ctf)
    return message.reply("You must specify a CTF to add problems to.").catch(console.error)

  const ctfname = ctf.toLowerCase()

  const ctfchannel = message.guild.channels.find(channel => (channel.name.toLowerCase() === ctfname) && channel.type === 'category')
  if (!ctfchannel)
    return message.reply(`${ctfname} not found!`).catch(console.error)

  if (problems.length === 0)
    return message.reply("You must specify at least one problem to add.").catch(console.error)

  problems = problems.map(p => p.toLowerCase())

  problems.forEach(problem => {
    if (!ctfchannel.children.find(channel => channel.name === problem))
      message.guild.createChannel(problem, {type:'text', parent:ctfchannel}).then(channel => message.guild.createRole({name:`${ctfname}-${channel.name}`, color:'BLUE', hoist:true, permissions: 104324673})).then(message.reply(`Created ${problem} channel for ${ctfname}!`)).catch(console.error)
  })
}

exports.help = {
  name: "addproblems",
  description: "Creates channels for problems for the specified CTF category.",
  usage: "addproblems ctf problem [...problems]"
};
