module.exports = async (client, guild) => {
    client.logger.log(`Added to the guild '${client.guild.name} (${client.guild.id})`);
    client.user.setActivity(`${client.defaultSettings.prefix}help | ${client.guilds.size} servers`);
};