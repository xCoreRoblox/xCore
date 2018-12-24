module.exports = async (client) => {
    client.logger.log(`Logged in as ${client.user.username} whilst on ${client.guilds.size} guilds!`);
    client.user.setActivity(`${client.defaultSettings.prefix}help | ${client.guilds.size} servers`);
    client.user.setStatus("dnd");
};