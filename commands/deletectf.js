exports.run = async (client, message, [ctf, ...problems]) => {

    if (!ctf)
	return message.reply("You must specify a CTF to create.").catch(console.error)

    const ctfname = ctf.toLowerCase()
    const ctfcat = message.guild.channels.find(channel => (channel.name.toLowerCase() === ctfname) && channel.type === 'category')

    if (!ctfcat)
	return message.reply(`${ctfname} not found!`).catch(console.error)
    
    ctfcat.children.forEach(channel => {
	if (channel.name !== 'general')
	    message.guild.roles.find(role => role.name === `${ctfname}-${channel.name}`).delete().catch(console.error)
	channel.delete().then(message.reply(`Deleted ${channel.name} channel of ${ctfname}!`)).catch(console.error)
    })

    ctfcat.delete().then(message.reply(`Deleted ${ctfname} category!`)).catch(console.error)
    
};

exports.conf = {
    permLevel: "Mod"
}

exports.help = {
    name: "deletectf",
    description: "Deletes CTF category and all channels under the category.",
    usage: "deletectf ctf"
};
