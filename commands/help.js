exports.run = async (client, message, args) => {
  if (!args[0]) {
    commandNames = client.commands.keyArray()
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    let output = `= Command List =\n\n[Use ${client.config.prefix}help <commandname> for details]\n\n`;
    
    client.commands.forEach(c => {
      output += `${client.config.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`
    })

    message.channel.send(output, {code: "asciidoc"});

  } else {
    let command = args[0]
    if (client.commands.has(command)) {
      command = client.commands.get(command)
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
    description: "Displays all commands.",
    usage: "help [command]"
};
