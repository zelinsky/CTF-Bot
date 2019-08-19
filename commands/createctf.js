exports.run = (client, message, [ctf, ...problems]) => {

  const modRole = message.guild.roles.find(role => role.name === "Mod")
  if (!modRole)
    return console.log("The Mod role does not exist")

  if (!message.member.roles.has(modRole.id))
    return message.reply("You can't use this command.").catch(console.error)

  if (!ctf)
    return message.reply("You must specify a CTF to create.").catch(console.error)

  const ctfname = ctf.toLowerCase()
  problems = problems.map(p => p.toLowerCase())

  if (message.guild.channels.find(channel => (channel.name.toLowerCase() === ctfname) && channel.type === 'category'))
    return message.reply(`${ctfname} already exists!`).catch(console.error)

  message.guild.createChannel(ctfname, {type:'category'}).then(category => {
    message.guild.createChannel('general', {type:'text', parent:category}).then(message.reply(`Created general channel for ${ctfname}!`)).catch(console.error)

    problems.forEach(problem => {
      message.guild.createChannel(problem, {type:'text', parent:category}).then(channel => message.guild.createRole({name:`${ctfname}-${channel.name}`, color:'BLUE', hoist:true, permissions: 104324673})).then(message.reply(`Created ${problem} channel for ${ctfname}!`)).catch(console.error)
    })
  }).then(message.reply(`Created ${ctfname} category!`)).catch(console.error)
}

exports.help = {
  name: "createctf",
  description: "Creates a category for the CTF including a general channel and channels for any specified problems.",
  usage: "createctf ctf [...problems]"
};
