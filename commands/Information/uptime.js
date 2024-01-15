const {
	Client,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
    ComponentType
} = require("discord.js");

module.exports = {
  data: {
    name: 'uptime',
    description: 'Time until the last restart of the bot!',
  },
    /**
     * 
     * @param {*} client 
     * @param {CommandInteraction} interaction 
     */
   async execute(interaction, client) {
    const but = client.channels.cache.get("1191258162226024511");
    but.send (
      `uptime command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
    );
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
			.setCustomId("refresh")
			.setLabel("Refresh")
			.setStyle(ButtonStyle.Secondary)
         )
         let totalSeconds = (client.uptime / 1000);
         let days = Math.floor(totalSeconds / 86400);
         totalSeconds %= 86400;
         let hours = Math.floor(totalSeconds / 3600);
         totalSeconds %= 3600;
         let minutes = Math.floor(totalSeconds / 60);
         let seconds = Math.floor(totalSeconds % 60);
         let uptime = `**${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds`
         const fireisgay = new EmbedBuilder()
         .setThumbnail(`https://images-ext-1.discordapp.net/external/iHlbfpESn8PhBpNccU_kGw5GAWQByeKSQr_L8KZ7azE/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/902942822250983445/dbbfad90572b0524efc17ee31a413dd1.png?width=473&height=473`)
          .setColor("#2F3136")
          .addFields({
          name:  "The uptime", 
          value: `> ${uptime}`
    })
          .addFields({
          name:  "**The ping**",
           value:  `> ${client.ws.ping}ms!`
    })
    
          const msg = await interaction.reply({
            fetchReply:true,
			embeds: [fireisgay],
			components: [row]
		   });

          const filter = async interaction => {

			if (interaction.user.id !== interaction.user.id) {
				interaction.reply({
					content: "<:AngryEyes:1196042941731442748> smh its not your button  ",
					ephemeral: true
				});
				return false;
			};
			return true;
		  }

		  const collector = msg.createMessageComponentCollector({
			filter,
			componentType: ComponentType.Button
		})

		 collector.on("collect", async (interaction) => {
		 	if (interaction.customId === "refresh") {
				interaction.deferUpdate()
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `**${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds`
          const fireisgay = new EmbedBuilder()
          .setThumbnail(`https://images-ext-1.discordapp.net/external/iHlbfpESn8PhBpNccU_kGw5GAWQByeKSQr_L8KZ7azE/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/902942822250983445/dbbfad90572b0524efc17ee31a413dd1.png?width=473&height=473`)
           .setColor("#2F3136")
           .addFields({
            name:  "The uptime", 
            value: `> ${uptime}`
      })
            .addFields({
            name:  "**The ping**",
             value:  `> ${client.ws.ping}ms!`
      })
      await   msg.edit({
            embeds: [fireisgay]
        })
      
    }
})}}