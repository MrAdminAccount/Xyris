const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
  name: "avatar",
  description: "Get the avatar of the specified member",
  options: [
    {
      name: "member",
      description: "Input member to get avatar",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
},
 
  async execute(interaction, client) {
    const { user } = interaction.options.get("member");

    const embed = new EmbedBuilder()
      .setTitle(`${user.tag}'s Avatar`)
      .setImage(user.displayAvatarURL({ dynamic: true }))
      .setColor("#2F3136")

    interaction.reply({ embeds: [embed] });
    const gay = client.channels.cache.get("1191258162226024511");
    gay.send (
      `Avatar command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
    );
  },
};