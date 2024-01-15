const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  data: {
  name: "8ball",
  description: "Tells you a fortune",
  options: [
      {
          name: "question",
          description: "The question you want to ask the magic 8ball",
          required: true,
          type: ApplicationCommandOptionType.String,
      }
  ],
},
    	  async execute(interaction, client) {
          const gay = client.channels.cache.get("1191258162226024511");
          gay.send (
            `8ball command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
          );
    var fortunes = [
      "Yes.",
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes definelty.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now...",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good...",
      "Very doubtful.",
    ];
    await interaction.reply(
      fortunes[Math.floor(Math.random() * fortunes.length)]
    );
  },
};