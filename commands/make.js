// Creates a category named `ctf` and channels under that category for each problem in `problems`
// Also creates roles for each problem to be used with !work

exports.run = async (client, message, [ctf, ...problems]) => {

    // Checks if at least one argument (the ctf name) was given
    if (!ctf)
	return message.reply("You must specify a CTF to create.").catch(console.error);

    const ctfname = ctf.toLowerCase();

    // Finds ctf category if it already exists
    let ctfcat = message.guild.channels.find(channel => (channel.name === ctfname) && channel.type === 'category');

    let output = ''
    
    // If ctf category doesn't exist, create it and add a general channel to it
    if (!ctfcat) {

	// Require additional confirmation
	const response = await client.awaitReply(message, `Are you sure you want to create the new ctf category __**${ctfname}**__?`);

	// If they respond with y or yes, continue.
	if (["y", "yes"].includes(response)) {

	    ctfcat = await message.guild.createChannel(ctfname, {type:'category'}).then(category => {
		message.guild.createChannel('general', {type:'text', parent:category}).catch(console.error);
		return category;
	    }).catch(console.error);
	    output += `+ [category] ${ctfname}\n+ [channel]  general\n`;
	    
	} else {
	    // If they respond with n or no, we inform them that the action has been cancelled.
	    if (["n","no","cancel"].includes(response)) {
		message.reply("Action cancelled.");
	    }
	    return;
	}
    }

    // If problem names are specified after ctf name, create a channel and role for each problem (if it  doesn't already exist) under the ctf category
    // Roles created are equivalent to the Member role and are intended for use with the !work command
    if (problems.length !== 0) {
	problems = problems.map(p => p.toLowerCase());

	problems.forEach(problem => {
	    if (!ctfcat.children.find(channel => channel.name === problem))
		message.guild.createChannel(problem, {type:'text', parent:ctfcat}).then(channel => message.guild.createRole({name:`${ctfname}-${channel.name}`, color:'BLUE', hoist:true, permissions: 104324673})).then(output += `+ [channel]  ${problem}\n`).catch(console.error);
	});
    }

    if (output) { // Send output
	message.channel.send(output, {code: 'diff'});
    } else { // No channels created
	return;
    }
};

exports.conf = {
    dm: false,
    bot: true,
    permLevel: "Member"
};

exports.help = {
    name: "make",
    category: "CTF Mod",
    description: "Creates a category for the CTF including a general channel and channels for any specified problems. If CTF already exists, adds specified problems to CTF.",
    usage: "make ctf [...problems]"
};
