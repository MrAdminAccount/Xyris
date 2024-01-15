const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');
const client = require("../../structures/index")

module.exports = {
  data: {
	name: 'invite',
	description: "Get the bot's invite link",
	type: ApplicationCommandType.ChatInput,
  },
  async execute(interaction) {
		const inviteUrl = `https://discord.com/oauth2/authorize?client_id=1103245198173163520&scope=bot&permissions=112150186033151`;
		const embed = new EmbedBuilder()
		.setTitle('Invite me')
		.setDescription(`Invite the bot to your server. [Click here](${inviteUrl})`)
		.setColor("#2F3136")
		.setTimestamp()
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter({ text: client.user.tag })

		const actionRow = new ActionRowBuilder()
		.addComponents([
			new ButtonBuilder()
			.setLabel('Invite')
			.setURL(inviteUrl)
			.setStyle(ButtonStyle.Link)
		])
		return interaction.reply({ embeds: [embed], components: [actionRow] })
	}
};