exports.run = async (client, message, args) => {
    if (!args[0]) {

	const myCommands = client.commands.filter(cmd => client.config.perms.indexOf(cmd.conf.permLevel) <= client.config.perms.indexOf(message.member.highestRole.name));
	const commandNames = myCommands.keyArray();
	const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

	let currentCategory = '';
	let output = `= Command List =\n\n[Use ${client.config.prefix}help <commandname> for details]\n`;
	const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );

	sorted.forEach( c => {
	    const cat = c.help.category;
	    if (currentCategory !== cat) {
		output += `\u200b\n== ${cat} ==\n`;
		currentCategory = cat;
	    }
	    output += `${client.config.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`
	});

	message.channel.send(output, {code: "asciidoc", split: { char: "\u200b" }});
	
    } else {
	let command = args[0]
	if (client.commands.has(command)) {
	    command = client.commands.get(command)
	    if (client.config.perms.indexOf(command.conf.permLevel) > client.config.perms.indexOf(message.member.highestRole.name)) return;
	    message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}`, {code:"asciidoc"})
	} else {
	    message.channel.send(`**${command}** command does not exist!`)
	}
    }
}

exports.conf = {
    dm: false,
    bot: true,
    permLevel: "Member"
}

exports.help = {
    name: "help",
    category: "Server",
    description: "Displays all commands.",
    usage: "help [command]"
};
