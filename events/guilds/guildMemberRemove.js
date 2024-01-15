const {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
  } = require("discord.js");
  const leaveSchema = require("../../structures/schemas/leaveSchema");
  
  module.exports = {
    name: "guildMemberRemove",
  
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
      const { user, guild } = interaction;
  
      leaveSchema.findOne({ guildId: guild.id }, async (err, data) => {
        if (!data) {
          return;
        } else {
          client.channels.cache
            .get(data.channelId)
            .send({
              embeds: [
                new EmbedBuilder()
                .setImage(`https://media.tenor.com/US78oVoLYxwAAAAC/minecraft-dungeos-goodbye-bith.gif`)
                .setColor("#2F3136")
                  .setDescription(`<:Angry:1194592713446785044> **${user.username}** left **${guild.name}**`)
                  .setFooter({
                    text: `${guild.name} now has ${guild.memberCount} members`,
                    iconURL: guild.iconURL(),
                  }),
              ],
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  };