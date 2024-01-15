const { Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: {
    name: "advice",
    description: "Get some useful advice for yourself! It will help you in the future.",
  },
  async execute(interaction, client) {
    const channel = client.channels.cache.get("1191258162226024511");
    channel.send(`Advice command is being used in **${interaction.guild.name}** by **${interaction.user.username}**`);

    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((json) => {
        const embed = new EmbedBuilder()
          .addFields({
            name: "**Advice:**",
            value: `${json.slip.advice}`,
          })
          .setColor("#2F3136");

        interaction.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.error("Error fetching advice:", error);
        interaction.reply("Oops! Something went wrong while fetching advice. Please try again later.");
      });
  },
};
