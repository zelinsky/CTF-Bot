const config = require('./config')
const fs = require('fs')
const Enmap = require('enmap')
const Discord = require('discord.js')
const client = new Discord.Client()
client.config = config

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, eventHandler.bind(null, client))
    delete require.cache[require.resolve(`./events/${file}`)]
  })
})

client.commands = new Enmap()

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith(".js")) return
    let props = require(`./commands/${file}`)
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
  })
})

client.login(config.token)
