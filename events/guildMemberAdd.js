module.exports = async (client, member) => {
  member.send(
    `Welcome to the UDCTF Discord server, **${member.user.username}**! Please read ${member.guild.channels.find(channel => channel.name === "info")} for information about this server!`
  ).catch(console.error);
};
