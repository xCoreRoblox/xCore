module.exports = async (client, guild) => {
    client.logger.log(`Removed from the guild '${client.guild.name} (${client.guild.id})`);
    client.user.setActivity(`${client.defaultSettings.prefix}help | ${client.guilds.size} servers`);

    if (client.settings.has(guild.id)) {
        client.settings.delete(guild.id);
      }
};