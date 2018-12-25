const instance = require("./package.json");

exports.run = async (client, message, args, level) => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.avatarURL}`, `${client.user.username}`)
    .addField("Version", `${instance.version}`, true)
    .addField("Owner", `LunarLunar#1337`, true)
    .addField("Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("Servers", `${client.guilds.size}`, true)
    .addField("Channels", `${client.channels.size}`, true)
    .addField("Users", `${client.user.users}`, true)
    .setColor("#2C2F33")
    message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["info"],
    permLevel: "User"
};

exports.help = {
    name: "stats",
    category: "Information",
    description: "Gives some useful bot information.",
    usage: "None"
  };