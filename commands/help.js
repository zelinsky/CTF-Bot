exports.run = async (client, message, args) => {

    // If command not specified
    if (!args[0]) {

	// Filter commands user has access to based on permissions
	const myCommands = client.commands.filter(cmd => client.config.perms.indexOf(cmd.conf.permLevel) <= client.config.perms.indexOf(message.member.highestRole.name));
	const commandNames = myCommands.keyArray();

	// Get longest command name for pretty output
	const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
	let currentCategory = '';
	let output = `= Command List =\n\n[Use ${client.config.prefix}help <commandname> for details]\n`;
	
	// Sort commands by category and name
	const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );

	// For each command, if start of new category, print category, and then print out command name and description
	sorted.forEach( c => {
	    const cat = c.help.category;
	    if (currentCategory !== cat) {
		output += `\u200b\n== ${cat} ==\n`;
		currentCategory = cat;
	    }
	    output += `${client.config.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
	});

	// Send output
	message.channel.send(output, {code: "asciidoc", split: { char: "\u200b" }});

    // Command specified	
    } else {
	let command = args[0]

	// Print command name, description, and usage info for command if found, else print error message
	if (client.commands.has(command)) {
	    command = client.commands.get(command);
	    if (client.config.perms.indexOf(command.conf.permLevel) > client.config.perms.indexOf(message.member.highestRole.name)) return;
	    message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}`, {code:"asciidoc"});
	} else {
	    message.channel.send(`**${command}** command does not exist!`);
	}
    }
};

exports.conf = {
    dm: false,
    bot: true,
    permLevel: "Member"
};

exports.help = {
    name: "help",
    category: "Server",
    description: "Displays all commands.",
    usage: "help [command]"
};
