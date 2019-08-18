module.exports = (client, member) => {
  member.send(
    `Welcome to the UDCTF Discord server! Make sure to read ${client.guilds.first().channels.find(channel => channel.name === "info")} for info!`
  )
}
