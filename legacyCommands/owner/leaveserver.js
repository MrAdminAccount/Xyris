const Discord = require("discord.js");
const OWNER_ID = require("../../structures/config.json").OWNER_ID;

module.exports = {
 
    name: "leaveserver",
    category: "owner",
    description: "Displays the list of servers the bot is in!",
    usage: " ",
    async execute(client, message, args) {
    if (message.author.id != OWNER_ID) {
      return message.channel.send("Limited to the bot owner only!");
    }
    
   
		    const guildId = args[0];
 
    if (!guildId) {
      return message.channel.send("Please provide an id");
    }
 
    const guild = client.guilds.cache.find((g) => g.id === guildId);
 
    if (!guild) {
      return message.channel.send("That guild wasn't found");
    }
 
    try {
      await guild.leave();
      message.channel.send(`Successfully left guild: **${guild.name}**`);
    } catch (e) {
      console.error(e);
      return message.channel.send("An error occurred leaving that guild");
    }
    }
  }