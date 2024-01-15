const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: {
    name: "motivation",
    description: "Get a motivational quote to help you power through!",
  },
  async execute(interaction, client) {
    const gay = client.channels.cache.get("1191258162226024511");
    gay.send (
      `motivation command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
    );

    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((json) => {
        const quote = json[Math.floor(Math.random() * json.length)];
        const embed = new EmbedBuilder()
          .setColor("#2F3136")
          .setTitle("Here's a motivational quote for you:")
          .setDescription(`"${quote.text}"`)
          .setFooter({
            text: `- ${quote.author}`
          });

        interaction.reply({ embeds: [embed]});
      })
      .catch((error) => {
        console.error(error);
        interaction.reply("There was an error fetching the motivational quote. Please try again later.");
      });
  }
};
