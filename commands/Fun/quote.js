const {  EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: {
  name: "quote",
  description: "Get a random quote to inspire you!",
},
  async execute(interaction, client) {
    const gay = client.channels.cache.get("1191258162226024511");
    gay.send (
      `quote command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
    );

    fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((json) => {
      const embed = new EmbedBuilder()
      .setColor("#2F3136")
      .setTitle("Here's a quote for you:")
      .setDescription(`"${json.content}"`)
      .setFooter({
        text: `- ${json.author}`
      });

      interaction.reply({ embeds: [embed]})
    })
    .catch((error) => {
      console.error(error);
      interaction.reply("There was an error fetching the quote. Please try again later.");
    });
  }
};
