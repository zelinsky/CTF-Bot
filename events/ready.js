module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`Logged in as ${client.user.tag}`, "ready");

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${client.config.prefix}help`, {type: "WATCHING"});
};
