exports.run = async (client, message, [ctf]) => {

  // Checks if at least one argument (the ctf name) was given
  if (!ctf) return message.reply("You must specify a CTF to archive.").catch(console.error);

  const ctfname = ctf.toLowerCase();

  // Finds ctf category
  const ctfcat = message.guild.channels.find(channel => (channel.name.toLowerCase() === ctfname) && channel.type === 'category');

  // Return with error message if not found
  if (!ctfcat)
  return message.reply(`${ctfname} not found!`).catch(console.error);

  var working_obj = {};
  var export_obj = {};

  var file_path = ctfname + ".json";

  var num_children = ctfcat.children.size;

  ctfcat.children.forEach(channel => {
    if (channel.lastMessageID == null) {
      num_children -= 1;
      return;
    }
    var all_the_messages = lots_of_messages_getter(channel);

    working_obj[channel.name] = {}

    // const all_messages_array = lots_of_messages_getter(channel);
    all_the_messages.then(function(messages) { 
      for (const msg of messages.reverse()) {
        working_obj = add_elts_to_obj(working_obj, msg.author.username, msg.content, msg.id, channel.name);
      }
      export_obj = JSON.stringify(working_obj); //convert it back to json
      var fs = require('fs');

      fs.writeFile(file_path, export_obj, 'utf8', function(err){
        if(err) pass;
        num_children -= 1;
        if (num_children == 0) {
          message.channel.send(`Here's all the data for \`${ctfname}\``, { files: [file_path] });
        }
      });     
      /* Eventually you will need this :)
      * https://discord.com/developers/docs/reference#snowflakes
      */
      
    });
  });
};

function add_elts_to_obj(obj, author, content, id, channel_name) {
  obj[channel_name][id] = {};
  obj[channel_name][id].author = author;
  obj[channel_name][id].content = content;
  return obj;
}

// borrowed from https://stackoverflow.com/a/55153808
async function lots_of_messages_getter(channel) {
  const sum_messages = [];
  let last_id;

  while (true) {
      const options = { limit: 100 };
      if (last_id) {
          options.before = last_id;
      }

      const messages = await channel.fetchMessages(options);
      sum_messages.push(...messages.array());
      last_id = messages.last().id;

      if (messages.size != 100) {
          break;
      }
  }

  return sum_messages;
}

exports.conf = {
  dm: false,
  bot: true,
  permLevel: "Admin"
};

exports.help = {
  name: "archive",
  category: "Server", 
  description: "Archives a category to a json file",
  usage: "archive category-name"
};
