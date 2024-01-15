const { Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
    name: 'ping',
    description: 'Gets the websocket ping.',
},
   /**
     * 
     * @param {*} client 
     * @param {CommandInteraction} interaction 
     */
  async execute(interaction, client) {
    const gay = client.channels.cache.get("1191258162226024511");
    gay.send (
      `ping command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
    );
        try {
            let ping = new EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(`<:ping:1100780871885279283> Ping Pong! \`${client.ws.ping}ms\``)

            interaction.reply({embeds : [ping], ephemeral: true})
        } catch (e) {
                console.log(e);
        }

    },
};