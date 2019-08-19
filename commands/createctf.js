exports.run = async (client, message, [ctf, ...problems]) => {

    if (!ctf)
	return message.reply("You must specify a CTF to create.").catch(console.error)

    const ctfname = ctf.toLowerCase()

    let ctfcat = message.guild.channels.find(channel => (channel.name.toLowerCase() === ctfname) && channel.type === 'category')
    
    if (!ctfcat) {
	ctfcat = await message.guild.createChannel(ctfname, {type:'category'}).then(category => {
	    message.guild.createChannel('general', {type:'text', parent:category}).then(message.reply(`Created ${ctfname} category!`)).then(message.reply(`Created general channel for ${ctfname}!`))
	    return category
	}).catch(console.error)
    }

    if (problems.length !== 0) {
	problems = problems.map(p => p.toLowerCase())

	problems.forEach(problem => {
	    if (!ctfcat.children.find(channel => channel.name === problem))
		message.guild.createChannel(problem, {type:'text', parent:ctfcat}).then(channel => message.guild.createRole({name:`${ctfname}-${channel.name}`, color:'BLUE', hoist:true, permissions: 104324673})).then(message.reply(`Created ${problem} channel for ${ctfname}!`)).catch(console.error)
	})
    }
};

exports.conf = {
    permLevel: "Mod"
}

exports.help = {
    name: "createctf",
    description: "Creates a category for the CTF including a general channel and channels for any specified problems. If CTF already exists, adds specified problems to CTF.",
    usage: "createctf ctf [...problems]"
};
