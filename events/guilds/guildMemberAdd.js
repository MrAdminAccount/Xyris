const {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
  } = require("discord.js");
  const joinSchema = require("../../structures/schemas/joinSchema");
  
  module.exports = {
    name: "guildMemberAdd",
  
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
      const { user, guild } = interaction;
  
      joinSchema.findOne({ guildId: guild.id }, async (err, data) => {
        if (!data) {
          return;
        } else {
          client.channels.cache
            .get(data.channelId)
            .send({
              embeds: [
                new EmbedBuilder()
                  .setDescription(`<:Wave:1194592237422653450> **${user.username}** joined **${guild.name}**`)
                  .setImage(`https://media.tenor.com/nvyXU_nufyEAAAAC/welcome-welcome-to-the-team.gif`)
                  .setColor("#2F3136")
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