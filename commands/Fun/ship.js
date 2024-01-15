const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const block = "⬛";
const heart = "🟥";

module.exports = {
    data: {
  name: "ship",
  description: "Ship an user to an user",
  usage: "(User) (User)",
  category: "Fun",
  options: [
    {
      type: 6,
      name: "1stuser",
      description: "The user you want to ship",
      required: true,
    },
    {
      type: 6,
      name: "2nduser",
      description: "The user you want to ship",
      required: true,
    },
  ],
  type: ApplicationCommandOptionType.ChatInput,
},
 	  async execute(interaction, client) {
      const gay = client.channels.cache.get("1191258162226024511");
      gay.send (
        `Ship command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
      );
    const user1 =  interaction.options.getMember("1stuser");
    const user2 =  interaction.options.getMember("2nduser");
    const loveEmbed = new EmbedBuilder()
    .setColor("#2F3136")
      .setFooter({
        text: `Shipped by ${interaction.user.tag}`})
      .setTimestamp()
      .setTitle(`<:love:1193197982863085638>| Shipping ${user1.displayName} and ${user2.displayName} | <:love:1193197982863085638>`)
      .setDescription(`🔻 |${user1.displayName} \n${ship()}\n🔺 |${user2.displayName}`);
    interaction.reply({ embeds: [loveEmbed] });
  },
  
};
function ship() {
  const hearts = Math.floor(Math.random() * 100);
  const hearte = hearts / 10;
  const str = `${heart.repeat(hearte)}${block.repeat(10 - hearte)} ${hearts}%`;
  return str;
}

