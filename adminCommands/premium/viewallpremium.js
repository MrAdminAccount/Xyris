const { Code } = require("../../structures/schemas/premiumcodes");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("premium-view")
    .setDescription("View all premium codes"),
  async execute(interaction) {
    const codes = await Code.find({ "redeemedBy.id": { $ne: null } });
    const users = codes.map((code) => code.redeemedBy);

    const embed = new EmbedBuilder()
       .setColor("#2F3136")
      .setTitle("Premium Codes")
      .setDescription("List of users who have redeemed a premium code:")
      .addFields(
        users.map((user) => {
          return {
            name: user.username,
            value: `<@${user.id}>`,
            inline: true,
          };
        })
      )
      .setFooter({ text: "Premium Codes" });

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
