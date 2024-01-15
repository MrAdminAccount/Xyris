const { ApplicationCommandOptionType } = require("discord.js");
const client = require("../../structures/index")

module.exports = {
    data: {
    name: "nuke",
    description: "nuke the channel",
    options: [
                {
                    name: 'channel',
                    description: 'channel to nuke',
                    required: true,
                    type: ApplicationCommandOptionType.Channel
                }
            ],
        },
        userPermissions: ['Administrator'],
        botPermissions: ['Administrator'],
      async execute(interaction) {
        const but = client.channels.cache.get("1191258162226024511");
		but.send(
			`nuke command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
		);
      const channeltonuke = interaction.options.getChannel('channel') || interaction.channel;
			interaction.reply(`Nuking ${channeltonuke}`);
			const position = channeltonuke.position;
			const newChannel = await channeltonuke.clone();
			await channeltonuke.delete();
			newChannel.setPosition(position);
      newChannel.send(`Channel Nuked by ${interaction.member}`);
			return newChannel.send("https://media1.tenor.com/images/e275783c9a40b4551481a75a542cdc79/tenor.gif?itemid=3429833")
  }
}