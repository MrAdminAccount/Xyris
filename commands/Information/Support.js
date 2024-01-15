const {  ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {
    name: 'support',
    emoji: `<:Invite_Shade:902424926500315166>`,
    description: `Join the support server`,
    },
   /**
     * 
     * @param {*} client 
     * @param {CommandInteraction} interaction 
     */
  async execute(interaction, client) {
    const gay = client.channels.cache.get("1191258162226024511");
    gay.send (
      `Support command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
    );
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel("Click me")
            .setURL("https://discord.gg/RxJ9P2MT9g")
            .setStyle(ButtonStyle.Link)
        )
       interaction.reply({components: [row]}); 
    }
}


