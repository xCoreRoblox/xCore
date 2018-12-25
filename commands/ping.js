exports.run = async (client, message, args, level) => {
    message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms\``)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "ping",
    category: "Information",
    description: "Measures the bot's latency.",
    usage: "None"
  };