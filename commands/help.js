exports.run = async (client, message, args, level) => {
    if (!args[0]) {
        const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
        const commandNames = myCommands.keyArray();
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    
        let currentCategory = "";
        let output = `Here is the command list:\n\n`;
        const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
        sorted.forEach( c => {
          const cat = c.help.category.toProperCase();
          if (currentCategory !== cat) {
            output += `\u200b\n== ${cat} ==\n`;
            currentCategory = cat;
          }
          output += `${c.help.name}${" ".repeat(longest - c.help.name.length)} - ${c.help.description}\n\n`;
        });
        const embed = new Discord.RichEmbed()
        .setDescription(`${output}`)
        .setColor("#2C2F33")
        message.channel.send({embed});
      } else {

        let command = args[0];
        if (client.commands.has(command)) {
          command = client.commands.get(command);
          if (level < client.levelCache[command.conf.permLevel]) return;
          const embed = new Discord.RichEmbed()
          .addField("Command", `${command.help.name}`)
          .addField("Bio", `${command.help.description}`)
          .addField("Usage", `${command.help.usage}`)
          .addField("Aliases", `${command.conf.aliases.join(", ")}`)
          .setColor("#2C2F33")
          message.channel.send({embed});
        }
      }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "help",
    category: "Information",
    description: "List's all of the available commands.",
    usage: "help [command]"
  };