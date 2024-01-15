const {  ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
    name: 'vote',
    emoji: `<:Vote:917801796817285180>`,
    description: `Vote for me :3`,
    },
   /**
     * 
     * @param {*} client 
     * @param {CommandInteraction} interaction 
     */
  async execute(interaction, client) {
    const gay = client.channels.cache.get("1191258162226024511");
    gay.send (
      `vote command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
    );
        const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setLabel("Top.gg")
        .setURL("https://top.gg/bot/1103245198173163520/vote")
        .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
        .setLabel("discordbotlist.com")
        .setURL("https://discordbotlist.com/bots/xyris/upvote")
        .setStyle(ButtonStyle.Link)
    )
    const embed = new EmbedBuilder()
    .setTitle(`*__Xyris Vote System__*`)
    .setDescription(`Voting for us is now open!`)
    .setColor("#2F3136")


   interaction.reply({ 	embeds: [embed], components: [row]}); 
}



  }