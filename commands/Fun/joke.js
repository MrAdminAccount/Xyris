const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: {
    name: "joke",
    description: "Get a random joke to make you laugh!",
  },
  async execute(interaction, client) {
    const gay = client.channels.cache.get("1191258162226024511");
    gay.send (
      `joke command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
    );

    fetch("https://official-joke-api.appspot.com/random_joke")
    .then((res) => res.json())
    .then((json) => {
      const embed = new EmbedBuilder()
      .setColor("#2F3136")
      .setTitle("Here's a joke for you:")
      .setDescription(`"${json.setup}"\n\n"${json.punchline}"`)
      .setFooter({
        text: "Laugh away!"
      });

      interaction.reply({ embeds: [embed]})
    })
    .catch((error) => {
      console.error(error);
      interaction.reply("There was an error fetching the joke. Please try again later.");
    });
  }
};
