module.exports = (client) => {

    client.loadCommand = (commandName) => {
	try {
	    client.logger.log(`Loading Command: ${commandName}`);
	    const props = require(`../commands/${commandName}`);
	    if (props.init) {
		props.init(client);
	    }
	    client.commands.set(props.help.name, props);
	    return false;
	} catch (e) {
	    return `Unable to load command ${commandName}: ${e}`;
	}
    };

    /*
      SINGLE-LINE AWAITMESSAGE
      A simple way to grab a single reply, from the user that initiated
      the command. Useful to get "precisions" on certain things...
      USAGE
      const response = await client.awaitReply(msg, "Favourite Color?");
      msg.reply(`Oh, I really love ${response} too!`);
    */
    client.awaitReply = async (msg, question, limit = 60000) => {
	const filter = m => m.author.id === msg.author.id;
	await msg.channel.send(question);
	try {
	    const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
	    return collected.first().content;
	} catch (e) {
	    return false;
	}
    };

    
    // `await client.wait(1000);` to "pause" for 1 second.
    client.wait = require("util").promisify(setTimeout);

    
    // These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
    process.on("uncaughtException", (err) => {
	const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
	client.logger.error(`Uncaught Exception: ${errorMsg}`);
	console.error(err);
	// Always best practice to let the code crash on uncaught exceptions. 
	// Because you should be catching them anyway.
	process.exit(1);
    });

    process.on("unhandledRejection", err => {
	client.logger.error(`Unhandled rejection: ${err}`);
	console.error(err);
    });
};

