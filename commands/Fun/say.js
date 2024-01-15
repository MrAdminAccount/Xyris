const { EmbedBuilder } = require("discord.js")
let color = "#2F3136";
module.exports = {
    data: {
        name: "say",
        description: "say stuff",
        options: [{
            name: "stuff",
            type: 3,
            description: "the stuff to say",
            required: true,
        }],
    },
    timeout: 100,

   	  async execute(interaction, client) {
        const gay = client.channels.cache.get("1191258162226024511");
        gay.send (
          `Say command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
        );
        await interaction.reply({ ephemeral: true, embeds: [new EmbedBuilder().setTitle("mhm").setColor(color)] });
        
        interaction.channel.send({ content: interaction.options.getString("stuff") });
    }
}