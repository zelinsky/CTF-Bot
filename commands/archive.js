exports.run = async (client, message, args) => {
  const all_messages_array = lots_of_messages_getter(message.channel);

  var final_obj = {};

  all_messages_array.then(messages =>{ 
    for (const msg of messages.reverse()) {
      // console.log(`${msg.author.username} : ${msg.id}`);
      final_obj[msg.id] = {};
      final_obj[msg.id].author = msg.author.username;
      final_obj[msg.id].content = msg.content;
    }
    console.log(final_obj);
    
    var fs = require('fs');
    export_obj = JSON.stringify(final_obj); //convert it back to json
    fs.writeFile('log.json', export_obj, 'utf8', function(err){
      if(err) throw err;
    }); // write it back 
  });

  message.channel.send("Testing message.", { files: ["./log.json"] });

};

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
  description: "Archives the given channels to a webpage",
  usage: "archive category-name"
};
