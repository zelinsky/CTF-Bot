module.exports = (client, member) => {
  member.send(
    `Welcome to the UDCTF Discord server! Please read ${client.guilds.first().channels.find(channel => channel.name === "info")} for information about this server!`
  )
}
