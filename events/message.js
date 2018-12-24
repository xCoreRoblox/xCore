module.exports = async (client, message) => {
    if (message.author.bot) return;
  
    const settings = message.settings = client.getSettings(message.guild.id);

    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
      return message.reply(`My prefix on this server is: \`${settings.prefix}\``);
    }
  
    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.guild && !message.member) await message.guild.fetchMember(message.author);
  
    const level = client.permlevel(message);
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if (!cmd) return;
  
    if (cmd && !message.guild && cmd.conf.guildOnly)
      return message.channel.send("You're unable to use this command in a Direct Message, please use it in a guild.");
  
    if (level < client.levelCache[cmd.conf.permLevel]) {
      if (settings.systemNotice === "true") {
        return message.channel.send("You're missing the required permission level to use this command.");
      } else {
        return;
      }
    }

    message.author.permLevel = level;
    
    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }
    
    cmd.run(client, message, args, level);
  };