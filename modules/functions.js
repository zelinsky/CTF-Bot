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

