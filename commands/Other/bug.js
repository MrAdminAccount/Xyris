const {ApplicationCommandOptionType, EmbedBuilder} = require("discord.js")

module.exports = {
    data: {
  name: "bug",
  emoji: `<:hmm:870269898289479721>`,
  description: "Bugs?",
  options: [
    {
      name: "bugs",
      description: "What's the bug?",
      type: ApplicationCommandOptionType.String,
      required: true,
    } 
  ],
    },
  async execute(interaction, client) {
    const gay = client.channels.cache.get("1191258162226024511");
    gay.send (
      `Bug command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
    );
    const suggestchannel = client.channels.cache.get("1100734933334503446");
    const suggestion = interaction.options.getString("bugs")
    interaction.reply({ content:
      "The development server for Mr. Xyris has received your bug. Soon our Mod team will review it.", ephemeral: true })
    const embed = new EmbedBuilder()
      .setTitle(`New Bug!`)
      .setDescription(`${suggestion} \n\nBy: ${interaction.user.tag}`)
      .setFooter({
        text: `ID: ${interaction.user.id}`
    })
      .setColor("#2F3136")

    suggestchannel.send({ embeds: [embed] });
  },
  
  catch(error) {
    const errorlogs = client.channels.cache.get("1100736615850192936");
    interaction.send(
      "Looks like an error has occured. The error has been reported to the Report Section"
    );
    errorlogs.send(`Error in Bug Command! \nError: \n` + error);

 
  },
  
  
};